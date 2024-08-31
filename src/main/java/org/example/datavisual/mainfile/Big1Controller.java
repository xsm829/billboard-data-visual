package org.example.datavisual.mainfile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
@RestController
public class Big1Controller {
 
    private final JdbcTemplate jdbcTemplate;
 
    @Autowired
    public Big1Controller(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
 
    @GetMapping("/chart-data")
    public Map<String, Object> getChartData() {
        String query = "SELECT singer, COUNT(*) AS count FROM hot100 GROUP BY singer ORDER BY count DESC LIMIT 10 ";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(query);
 
        List<String> labels = new ArrayList<>();
        List<Integer> values = new ArrayList<>();
 
        for (Map<String, Object> row : result) {
            String regionName = (String) row.get("singer");
            Integer count = ((Number) row.get("count")).intValue();
 
            labels.add(regionName);
            values.add(count);
        }
 
        Map<String, Object> data = new HashMap<>();
        data.put("labels", labels);
        data.put("values", values);
 
        return data;
    }
}