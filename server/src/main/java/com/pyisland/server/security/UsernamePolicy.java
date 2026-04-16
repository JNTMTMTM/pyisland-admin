package com.pyisland.server.security;

import java.util.regex.Pattern;

/**
 * 统一的用户名合法性校验。
 */
public final class UsernamePolicy {

    private static final Pattern PATTERN = Pattern.compile("^[A-Za-z0-9_.-]{3,32}$");

    private UsernamePolicy() {
    }

    /**
     * 校验用户名是否合法。
     * @param username 用户名。
     * @return 不合法时返回错误提示，合法时返回 null。
     */
    public static String validate(String username) {
        if (username == null || username.isBlank()) {
            return "用户名不能为空";
        }
        if (!PATTERN.matcher(username).matches()) {
            return "用户名仅允许 3-32 位字母、数字、下划线、点或短横线";
        }
        return null;
    }
}
