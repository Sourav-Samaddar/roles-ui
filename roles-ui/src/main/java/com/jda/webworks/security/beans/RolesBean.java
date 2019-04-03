package com.jda.webworks.security.beans;

import java.io.Serializable;

public class RolesBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long roleId;
	private String roleName;
	private String enterpriseName;
	private String description;
	private int inheritable;
	
	public long getRoleId() {
		return roleId;
	}
	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getEnterpriseName() {
		return enterpriseName;
	}
	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getInheritable() {
		return inheritable;
	}
	public void setInheritable(int inheritable) {
		this.inheritable = inheritable;
	}

}
