package com.mycomp.task;

import static com.example.demo.tables.Employer.EMPLOYER;
import static com.example.demo.tables.Task.TASK;
import java.sql.Connection;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import org.jooq.DSLContext;
import org.jooq.JSONFormat;
import org.jooq.JSONFormat.RecordFormat;
import org.jooq.Record1;
import org.jooq.Record4;
import org.jooq.Record5;
import org.jooq.Result;
import static org.jooq.SQLDialect.POSTGRES;
import org.jooq.impl.DSL;
import static org.jooq.impl.DSL.count;
import static org.jooq.impl.DSL.max;

@Path("/")
public class AppController {
    Connection appConn;
    
    public AppController() {
        try {
            appConn = DataSource.getConnection();
        } catch (Exception ex) {
            appConn = null;
        }
    }
    
    public AppController(Connection conn) {
        appConn = conn;
    }
    
    @GET
    @Path("/getEmployers")
    public Response getEmployers()
    {
        try { 
            DSLContext create = DSL.using(appConn, POSTGRES);
            Result<Record5<Long, String, String, String, Integer>> record = create.select(
                    EMPLOYER.as("M").ID.as("ID"),
                    EMPLOYER.as("M").NAME.as("NAME"),
                    EMPLOYER.as("S").NAME.as("CHIEF"),
                    EMPLOYER.as("M").BRANCH_OFFICE.as("BRANCH"),
                    count(TASK.ID).as("TASK")
                    )
                    .from(EMPLOYER.as("M"))
                    .leftJoin(EMPLOYER.as("S"))
                        .on(EMPLOYER.as("M").CHIEF.eq(EMPLOYER.as("S").ID))
                    .leftJoin(TASK)
                        .on(EMPLOYER.as("M").ID.eq(TASK.EMPLOYER_ID))
                    .groupBy(EMPLOYER.as("M").ID, EMPLOYER.as("S").ID)
                    .fetch();
            
            return Response.ok(record.formatJSON(new JSONFormat()
                .header(false)
                .recordFormat(RecordFormat.OBJECT))).build();            
        } catch(Exception e ) {
            return Response.status(500).build();
        } 
    }
    
    @GET
    @Path("/getTasks")
    public Response getTasks()
    {
        try (Connection conn = DataSource.getConnection()) {
            DSLContext create = DSL.using(conn, POSTGRES);
            Result<Record4<Long, String, String, Long>> record = create.select(
                    TASK.ID.as("ID"),
                    TASK.DESCRIPTION.as("DESCRIPTION"),
                    EMPLOYER.NAME.as("NAME"),
                    TASK.PRIORITY.as("PRIORITY")
                    )
                    .from(TASK)
                    .leftJoin(EMPLOYER)
                        .on(TASK.EMPLOYER_ID.eq(EMPLOYER.ID))
                    .fetch();
            
            return Response.ok(record.formatJSON(new JSONFormat()
                .header(false)
                .recordFormat(RecordFormat.OBJECT))).build();
        } catch (Exception e) {
            return Response.ok(e.getMessage()).build();
        } 
    }
        
    @POST
    @Path("/addEmployer")
    public Response addEmployer(
            @DefaultValue("")    @QueryParam("name") String name,
            @DefaultValue("")    @QueryParam("chief") String chief,
            @DefaultValue("")    @QueryParam("branch") String branch
            ) {
               
        name = name.trim();
        chief = chief.trim();
        branch = branch.trim();
        
        if("".equals(name) || "".equals(branch)) {            
            return Response.status(500).build();
        }    
                            
        if("".equals(chief)) {
            try {
                DSLContext create = DSL.using(appConn, POSTGRES);

                create.insertInto(EMPLOYER, EMPLOYER.NAME, EMPLOYER.BRANCH_OFFICE)
                    .values(name, branch)
                    .execute();
            } catch (Exception e) {
                return Response.status(500).build();
            }
            return Response.ok("Добавлен").build();
        }
        else {
            try {
                DSLContext create = DSL.using(appConn, POSTGRES);
                
                Result<Record1<Long>> record = create.select(
                    EMPLOYER.ID
                    )
                    .distinctOn(EMPLOYER.NAME)
                    .from(EMPLOYER)
                    .where(EMPLOYER.NAME.eq(chief))
                    .fetch();                
                
                if(record.isEmpty())
                    return Response.status(500).build();
                
                create.insertInto(EMPLOYER, EMPLOYER.NAME, EMPLOYER.CHIEF, EMPLOYER.BRANCH_OFFICE)
                    .values(name, record.getValue(0, EMPLOYER.ID), branch)
                    .execute();
            } catch (Exception e) {
                return Response.status(500).build();
            }
            
            return Response.ok("Добавлен").build();     
        }
    }
    
    @POST
    @Path("/updateEmployer")
    public Response updateEmployer(
            @DefaultValue("")           @QueryParam("name")     String  name,
            @DefaultValue("noChief")    @QueryParam("chief")    String  chief,
            @DefaultValue("")           @QueryParam("branch")   String  branch,
            @DefaultValue("noId")       @QueryParam("id")       Long    id
            )
    {
        name = name.trim();
        chief = chief.trim();
        branch = branch.trim();
                
        if("".equals(name) || "".equals(branch)) {
            return Response.status(500).build();
        }
        
        if("".equals(chief)) {
            try {
                DSLContext create = DSL.using(appConn, POSTGRES);
                                
                create.update(EMPLOYER)
                    .set(EMPLOYER.NAME,          name)
                    .set(EMPLOYER.BRANCH_OFFICE, branch)                    
                    .setNull(EMPLOYER.CHIEF)
                    .where(EMPLOYER.ID.eq(id))
                    .execute();
            } catch (Exception e) {
                return Response.status(500).build();
            }
            return Response.status(200).build();
        }
        else {
            try {
                DSLContext create = DSL.using(appConn, POSTGRES);
                
                Result<Record1<Long>> record = create.select(
                    EMPLOYER.ID
                    )
                    .distinctOn(EMPLOYER.NAME)
                    .from(EMPLOYER)
                    .where(EMPLOYER.NAME.eq(chief))
                    .fetch();                
                
                if(record.isEmpty())
                    return Response.status(500).build();
                
                create.update(EMPLOYER)
                    .set(EMPLOYER.NAME,             name)
                    .set(EMPLOYER.BRANCH_OFFICE,    branch)                    
                    .set(EMPLOYER.CHIEF,            record.getValue(0, EMPLOYER.ID))
                    .where(EMPLOYER.ID.eq(id))
                    .execute();                
            } catch (Exception e) {
                return Response.status(500).build();
            }
            
            return Response.ok("Обновлён").build();    
        }        
    }
    
    @POST
    @Path("/deleteEmployer")
    public Response deleteEmployer(
            @DefaultValue("noId")           @QueryParam("id")       Long    id
            ) {
        try {
                DSLContext create = DSL.using(appConn, POSTGRES);                
                // ---- Проверка, есть ли сотрудник ----
                Result<Record1<Long>>record = create.select(
                    EMPLOYER.ID
                    )
                    .from(EMPLOYER)
                    .where(EMPLOYER.ID.eq(id))
                    .fetch();       
                if(record.isEmpty())               
                    return Response.status(500).entity("Нет такого пользователя").build(); 
                
                
                // ---- Проверка, есть ли руководимые сотрудники ----
                record = create.select(
                    EMPLOYER.ID
                    )
                    .distinctOn(EMPLOYER.NAME)
                    .from(EMPLOYER)
                    .where(EMPLOYER.CHIEF.eq(id))
                    .fetch();       
                
                if(record.isNotEmpty())
                    return Response.status(500).entity("У этого сотрудника есть ведомые").build();
                
                // ---- Проверка, есть ли задачи ----
                record = create.select(
                    TASK.ID
                    )
                    .from(TASK)
                    .where(TASK.EMPLOYER_ID.eq(id))
                    .fetch();       
                if(record.isNotEmpty())               
                    return Response.status(500).entity("У этого сотрудника есть задачи").build(); 
                                
                // ---- Удаление пользователя ----
                create.delete(EMPLOYER)                    
                    .where(EMPLOYER.ID.eq(id))
                    .execute();
            } catch (Exception e) {
                return Response.status(500).build();
            }
            return Response.ok("Удалён").build();
    }
    
    @POST
    @Path("/addTask")
    public Response addTask(
            @DefaultValue("")   @QueryParam("discription")  String discription,
            @DefaultValue("")   @QueryParam("chief")        String chief,
            @DefaultValue("")   @QueryParam("priority")     Long priority
            ) {
        
        //string triming
        discription = discription.trim();
        chief       = chief.trim();
        
        if("".equals(discription) || "".equals(chief)) {
            return Response.status(500).build();
        }
        
        if(!chief.isEmpty() && !discription.isEmpty()) {
            if(priority <= 0 ) return Response.status(500).build(); 
            try {
                DSLContext create = DSL.using(appConn, POSTGRES);
                Result<Record1<Long>> record = create.select(
                        max(TASK.PRIORITY) 
                        )
                        .from(TASK)
                        .fetch();
//                if(!record.isEmpty()) {
//                    long max_priority = record.getValue(0, max(TASK.PRIORITY)) + 1l;
//                    if(priority > max_priority) return Response.status(500).build();
//                } else {
//                    if(priority > 2) return Response.status(500).build();
//                }
                long max_priority = record.getValue(0, max(TASK.PRIORITY)) != null ? record.getValue(0, max(TASK.PRIORITY)) : 1;
                if(priority > max_priority) return Response.status(500).build();
                
                record = create.select(
                        EMPLOYER.ID
                        )
                        .distinctOn(EMPLOYER.NAME)
                        .from(EMPLOYER)
                        .where(EMPLOYER.NAME.eq(chief))
                        .fetch();
                
                create.insertInto(TASK, TASK.DESCRIPTION, TASK.EMPLOYER_ID, TASK.PRIORITY)
                    .values(discription, record.getValue(0, EMPLOYER.ID), priority)
                    .execute();
            } catch (Exception e) {
                return Response.status(500).build();
            }
            return Response.ok("Добавил задачу").build();
        }  
        return Response.status(500).build();                    
    }
    
    @POST
    @Path("/updateTask")
    public Response updateTask(
            @DefaultValue("")           @QueryParam("description")  String  description,
            @DefaultValue("")           @QueryParam("chief")        String  chief,
            @DefaultValue("noPriority") @QueryParam("priority")     Long    priority,
            @DefaultValue("noId")       @QueryParam("id")           Long    id
            )
    {
        description = description.trim();
        chief = chief.trim();
                
        if("".equals(description) || "".equals(chief)) {
            return Response.status(502).build();
        }
        
        if(!chief.isEmpty() && !description.isEmpty()) {
            try (Connection conn = DataSource.getConnection()) {
                DSLContext create = DSL.using(conn, POSTGRES);
                               
                Result<Record1<Long>> record = create.select(
                    EMPLOYER.ID
                    )
                    .distinctOn(EMPLOYER.NAME)
                    .from(EMPLOYER)
                    .where(EMPLOYER.NAME.eq(chief))
                    .fetch();                
                
                if(record.isEmpty())
                    return Response.ok("Нет такого роководителя").build();
                
                create.update(TASK)
                    .set(TASK.DESCRIPTION,      description)
                    .set(TASK.EMPLOYER_ID,      record.getValue(0, EMPLOYER.ID))                    
                    .set(TASK.PRIORITY,         priority)
                    .where(TASK.ID.eq(id))
                    .execute();
            } catch (Exception e) {
                return Response.ok(e.getMessage()).build();
            }
            return Response.ok("Обновил задачу").build();
        }  
        return Response.status(502).build();                    
    }
    
    
    @POST
    @Path("/deleteTask")
    public Response deleteTask(
            @DefaultValue("noId") @QueryParam("id") Long id
            ) {
            try (Connection conn = DataSource.getConnection()) {
                DSLContext create = DSL.using(conn, POSTGRES);
                                
                create.delete(TASK)                    
                    .where(TASK.ID.eq(id))
                    .execute();
            } catch (Exception e) {
                return Response.ok(e.getMessage()).build();
            }
            return Response.ok("Удалил задачу").build();
    }
}
