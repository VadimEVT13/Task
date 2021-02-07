/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mycomp.task.DataSource;
import com.opentable.db.postgres.embedded.EmbeddedPostgres;
import com.opentable.db.postgres.embedded.LiquibasePreparer;
import com.opentable.db.postgres.junit.EmbeddedPostgresRules;
import com.opentable.db.postgres.junit.PreparedDbRule;
import java.sql.Connection;
import liquibase.Contexts;
import liquibase.Liquibase;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
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

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    // @Test
    // public void hello() {}    
        
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
        Connection con = pg.getPostgresDatabase().getConnection();
        assertEquals(con != null, true);        
    }
    
//    @Test
//    public void testDataBase() throws Exception {
//        System.out.println("test: DataBase");
//        Connection con = pg.getPostgresDatabase().getConnection();
//        
//        
//        
//    }
}
