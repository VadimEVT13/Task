/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mycomp.task.AppController;
import com.mycomp.task.DataSource;
import com.opentable.db.postgres.embedded.EmbeddedPostgres;
import com.opentable.db.postgres.embedded.LiquibasePreparer;
import com.opentable.db.postgres.junit.EmbeddedPostgresRules;
import com.opentable.db.postgres.junit.PreparedDbRule;
import static java.lang.Integer.parseInt;
import java.sql.Connection;
import javax.json.JsonObject;
import javax.ws.rs.core.Response;
import liquibase.Contexts;
import liquibase.Liquibase;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.glassfish.jersey.message.internal.OutboundJaxrsResponse;
import org.jooq.tools.json.JSONArray;
import org.jooq.tools.json.JSONObject;
import org.jooq.tools.json.JSONParser;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Rule;

/**
 *
 * @author Vadim
 */
public class JUnitTest {
        
    EmbeddedPostgres pg;
    
    public JUnitTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() throws Exception { 
        pg = EmbeddedPostgres.start();
        try(Connection con = pg.getPostgresDatabase().getConnection()) {
            Liquibase lb = new Liquibase("liqui/db.changelog-master.xml", 
                    new ClassLoaderResourceAccessor(),
                    new JdbcConnection(con));
            Contexts ctx = null;
            lb.update(ctx);         
        }
    }
    
    @After
    public void tearDown() throws Exception {
        pg.close();
    }
        
    //HikariCP - test
    @Test
    public void testOpenConnection() throws Exception {
        System.out.println("test: OpenConnection");
        Connection result = DataSource.getConnection();
        assertEquals(result != null, true);        
    }
       
    @Test
    public void testDataBaseConnection() throws Exception {
        System.out.println("test: DataBaseConnection");
        Connection conn = pg.getPostgresDatabase().getConnection();
        assertEquals(conn != null, true);        
    }
    
    @Test
    public void testDataBase_Employer() throws Exception {
        System.out.println("test: DataBase_Employer");
        Connection conn = pg.getPostgresDatabase().getConnection();
        
        // ----**** Проверка добавление Employer ****----
        System.out.println("test: EmployerAdd");
        AppController ac = new AppController(conn);
        Response r_add_kirk                     = ac.addEmployer("Kirk",    "",         "Branch_1");
        Response r_add_spoke                    = ac.addEmployer("Spoke",   "",         "Branch_1");
        // --- Employer с chief
        Response r_add_vadim                    = ac.addEmployer("Vadim",   "Spoke",    "Branch_1");
        // --- Employer с несуществующим chief ---
        Response r_add_chief_error              = ac.addEmployer("Test",    "Who",      "Branch_1");
        // --- Employer без имени ---
        Response r_add_name_error               = ac.addEmployer("",        "",         "Branch_1");
        // --- Employer без филиала ---
        Response r_add_branch_error             = ac.addEmployer("Test",    "",         "");
        // --- Employer без имени и филиала ---
        Response r_add_name_and_branch_error    = ac.addEmployer("",        "",         "");
        
        assertEquals(
                r_add_kirk.getStatus()          == 200 && 
                r_add_spoke.getStatus()         == 200 &&
                r_add_vadim.getStatus()         == 200 &&
                r_add_chief_error.getStatus()   != 200 &&
                r_add_name_error.getStatus()    != 200 &&
                r_add_branch_error.getStatus()  != 200 &&
                r_add_name_and_branch_error.getStatus()  != 200                        
                        , true);  
              
        // ----**** Проверка getEmployers ****----
        System.out.println("test: EmployerGet");
        Response r_get = ac.getEmployers();
        assertEquals(r_get.getStatus() == 200, true);
               
        long kirks_id = 0; //id кирка, в последствии его модифицировать
        long spoke_id = 0; //id спока, в последствии попробовать его удалить
        
        JSONParser parser = new JSONParser();
        JSONArray r_employers = (JSONArray) parser.parse((String)r_get.getEntity());

        for(Object o: r_employers) {
            JSONObject obj = (JSONObject) o;
            if(((String)obj.get("NAME")).trim().equals("Kirk"))
            {
                kirks_id = (long) obj.get("ID");
            }
            if(((String)obj.get("NAME")).trim().equals("Spoke"))
            {
                spoke_id = (long) obj.get("ID");
            }
        }      
              
        // ----**** Проверка обновления Employer ****----
        System.out.println("test: EmployerUpdate");
        Response r_update_kirk_1 = ac.updateEmployer("Kirk_2",  "",         "Branch_2", kirks_id);
        Response r_update_kirk_2 = ac.updateEmployer("Kirk",    "Spoke",    "Branch_2", kirks_id);
        Response r_update_kirk_3 = ac.updateEmployer("",        "",         "Branch_2", kirks_id);
        Response r_update_kirk_4 = ac.updateEmployer("Kirk",    "",         "",         kirks_id);
        Response r_update_kirk_5 = ac.updateEmployer("Kirk",    "",         "Branch_3", kirks_id);
        
        assertEquals(
                r_update_kirk_1.getStatus() == 200 &&
                r_update_kirk_2.getStatus() == 200 &&
                r_update_kirk_3.getStatus() != 200 &&
                r_update_kirk_4.getStatus() != 200 &&
                r_update_kirk_5.getStatus() == 200                        
                , true);
        
        // ----**** Удаление Employer ****----
        System.out.println("test: EmployerDelete");
        Response r_delete_kirk_1 = ac.deleteEmployer(kirks_id);
        Response r_delete_kirk_2 = ac.deleteEmployer(kirks_id);
        Response r_delete_spoke  = ac.deleteEmployer(spoke_id);
        
        assertEquals(
                r_delete_kirk_1.getStatus() == 200 &&
                r_delete_kirk_2.getStatus() != 200 &&
                r_delete_spoke.getStatus()  != 200
                , true);        
    }
    
    @Test
    public void testDataBase_Task() throws Exception {
        System.out.println("test: DataBase_Task");
        Connection conn = pg.getPostgresDatabase().getConnection();
        
        // ----**** Проверка добавление Task ****----
        // --- Инициализация ---
        System.out.println("test: TaskAdd");
        AppController ac = new AppController(conn);
        ac.addEmployer("Kirk",    "",         "Branch_1");
        ac.addEmployer("Spoke",   "",         "Branch_1");
        ac.addEmployer("Vadim",   "Spoke",    "Branch_1");
        
        // --- Добавление задач ---
        Response r_task_spoke = ac.addTask("Фазеры на оглушение", "Spoke", 1l);
        Response r_task_vadim = ac.addTask("Фазеры на оглушение", "Vadim", 1l);
        
        // --- Ошибочные действия ---
        Response r_task_vadim_error_1   = ac.addTask("Фазеры на оглушение", "Vadim", 0l);
        Response r_task_vadim_error_2   = ac.addTask("Фазеры на оглушение", "Vadim", 5l);
        Response r_task_discription     = ac.addTask("", "Spoke", 1l);
        Response r_task_chief           = ac.addTask("Фазеры на оглушение", "", 1l);
        Response r_task_discription_and_chief = ac.addTask("", "", 1l);
        
        assertEquals(
                r_task_spoke.getStatus()                    == 200 &&
                r_task_vadim.getStatus()                    == 200 &&
                r_task_vadim_error_1.getStatus()            != 200 &&
                r_task_vadim_error_2.getStatus()            != 200 &&
                r_task_discription.getStatus()              != 200 && 
                r_task_chief.getStatus()                    != 200 &&
                r_task_discription_and_chief.getStatus()    != 200                      
                , true);
        
        // ----**** Проверка getTask ****----
        System.out.println("test: TaskGet");
        Response r_get = ac.getTasks();
        assertEquals(r_get.getStatus() == 200, true);
               
        long vadim_task_id = 0; //id vadim, в последствии его модифицировать
        long spoke_id = 0;      //id спока, в последствии попробовать его удалить
        
        JSONParser parser = new JSONParser();
        JSONArray r_tasks = (JSONArray) parser.parse((String)r_get.getEntity());

        for(Object o: r_tasks) {
            JSONObject obj = (JSONObject) o;
            if(((String)obj.get("NAME")).trim().equals("Vadim"))
            {
                vadim_task_id = (long) obj.get("ID");
            }
        }
        
        Response r_get_employer = ac.getEmployers();
        JSONArray r_employers = (JSONArray) parser.parse((String)r_get_employer.getEntity());
        
        for(Object o: r_employers) {
            JSONObject obj = (JSONObject) o;
            if(((String)obj.get("NAME")).trim().equals("Spoke"))
            {
                spoke_id = (long) obj.get("ID");
            }
        }
              
              
        // ----**** Проверка обновления Employer ****----
        System.out.println("test: TaskUpdate");
        Response r_update_vadim_task_1 = ac.updateTask("Новое описание",    "Vadim",    1l, vadim_task_id);
        Response r_update_vadim_task_2 = ac.updateTask("Новое описание",    "Vadim",    2l, vadim_task_id);
        
        Response r_update_vadim_task_3 = ac.updateTask("Новое описание",    "Vadim",    5l, vadim_task_id);
        Response r_update_vadim_task_4 = ac.updateTask("",                  "Vadim",    1l, vadim_task_id);
        Response r_update_vadim_task_5 = ac.updateTask("Новое описание",    "Vadim",    1l, 100l);
        Response r_update_vadim_task_6 = ac.updateTask("Новое описание",    "",         1l, vadim_task_id);
        
        assertEquals(
                r_update_vadim_task_1.getStatus() == 200 &&
                r_update_vadim_task_2.getStatus() == 200 &&
                r_update_vadim_task_3.getStatus() != 200 &&
                r_update_vadim_task_4.getStatus() != 200 &&
                r_update_vadim_task_5.getStatus() != 200 &&
                r_update_vadim_task_6.getStatus() != 200                        
                , true);
        
        // ----**** Удаление Task и Employer с задачей****----
        System.out.println("test: TaskDelete");
        Response r_delete_vadim_task_1  = ac.deleteTask(vadim_task_id);
        Response r_delete_vadim_task_2  = ac.deleteTask(vadim_task_id);
        Response r_delete_spoke         = ac.deleteEmployer(spoke_id);
        
        assertEquals(
                r_delete_vadim_task_1.getStatus()   == 200 &&
                r_delete_vadim_task_2.getStatus()   != 200 &&
                r_delete_spoke.getStatus()          != 200
                , true);        
    }
}
