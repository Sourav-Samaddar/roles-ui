package com.jda.webworks.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jda.webworks.security.RolesUIProxy;
import com.jda.webworks.security.beans.RolesBean;

@Controller
public class RolesUIController {

	@Autowired
	RolesUIProxy proxy;
	
	@ResponseBody
	@RequestMapping("/home")
	public String Hello() {
		return "Hello sourav";
	}
	
	@RequestMapping("/allRoles")
	public String getAllRoles(Model model) {
		return "rolespage";
	}
	
	@RequestMapping("/allRoles/json")
	@ResponseBody
	public List<RolesBean> getAllRolesJson(){
		return proxy.getAllRolesJson();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/updateRole/post", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateRole (@RequestBody RolesBean rolesBean) {
        System.out.println(rolesBean.getRoleId() + " " +rolesBean.getRoleName());
    }
	
	@RequestMapping(method = RequestMethod.POST, value = "/addRole/post", produces = MediaType.APPLICATION_JSON_VALUE)
    public void addRole (@RequestBody RolesBean rolesBean) {
		System.out.println("Inside add:"+rolesBean.getRoleId() + " " + rolesBean.getRoleName());
    }
}
