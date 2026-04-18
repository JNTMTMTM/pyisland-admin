package com.pyisland.server.auth.service;

import org.springframework.stereotype.Service;

/**
 * 邮箱验证码服务。
 */
@Service
public class EmailVerificationService {

    /**
     * 发送验证码场景。
     */
    public enum Scene {
        REGISTER,
        LOGIN,
        RESET_PASSWORD,
        CHANGE_EMAIL
    }

    /**
     * 发送验证码请求参数。
     * @param email 目标邮箱。
     * @param scene 场景。
     * @param clientIp 客户端 IP。
     */
    public record SendCodeCommand(String email, Scene scene, String clientIp) {
    }

    /**
     * 验证验证码请求参数。
     * @param email 目标邮箱。
     * @param scene 场景。
     * @param code 验证码。
     * @param consume 是否一次性消费。
     */
    public record VerifyCodeCommand(String email, Scene scene, String code, boolean consume) {
    }

    /**
     * 发送验证码结果。
     * @param ok 是否成功。
     * @param code 业务码。
     * @param message 结果消息。
     * @param retryAfterSeconds 建议重试等待秒数。
     */
    public record SendCodeResult(boolean ok, int code, String message, long retryAfterSeconds) {
    }

    /**
     * 验证验证码结果。
     * @param ok 是否成功。
     * @param code 业务码。
     * @param message 结果消息。
     */
    public record VerifyCodeResult(boolean ok, int code, String message) {
    }

    /**
     * 发送邮箱验证码。
     */
    public SendCodeResult sendCode(SendCodeCommand command) {
        return new SendCodeResult(false, 503, "验证码服务初始化中", 0);
    }

    /**
     * 校验邮箱验证码。
     */
    public VerifyCodeResult verifyCode(VerifyCodeCommand command) {
        return new VerifyCodeResult(false, 503, "验证码服务初始化中");
    }
}
