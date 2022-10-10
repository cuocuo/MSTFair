/*
 * Copyright (C) 2005-present, 58.com.  All rights reserved.
 * Use of this source code is governed by a BSD type license that can be
 * found in the LICENSE file.
 */
#include <fair_app.h>
#include <jni.h>
#include <fair_ffi.h>
#include <cstring>
#include <cstdlib>
#include <android/log.h>

#define TAG    "jni-test" // 这个是自定义的LOG的标识
#define LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,TAG,__VA_ARGS__) // 定义LOGD类型

jobject fair_ffi;

extern "C"
JNIEXPORT void JNICALL
Java_com_wuba_fair_channel_FairFfi_init(JNIEnv *env,
                                                           jobject instance,
                                                           jobject obj) {
//---- 强全局变量
  fair_ffi = env->NewGlobalRef(obj);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_wuba_fair_channel_FairFfi_release(JNIEnv *env,
                                                              jobject instance) {

  LOGD("########## 释放内存................");
  env->DeleteGlobalRef(fair_ffi);
}

jobject get_fair_ffi() {
  return fair_ffi;
}


