/**
 * @Author: Oceanxy
 * @Email: xieyang@hiynn.com
 * @Description: 着色器语言 GLSL ES
 * @Date: 2018/8/30
 * @Last Modified by: Oceanxy
 * @Last Modified time:
 */

#version 120

// 简单的顶点着色器
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_MvpMatrix;
varying vec4 v_Color;

void main() {
    gl_Position = u_MvpMatrix * a_Position;
    v_Color = a_Color;
}

// 简单的片元着色器
#ifdef GLSL_ES
precision mediump float;
#endif
varying vec4 v_Coloe;
void main() {
    gl_FragColor = v_Color;
}
