# 🏆 Playwright Testing for E-commerce Application

## 📌 Overview

This repository contains automated tests for an eCommerce application using Playwright. It follows a structured **Page Object Model (POM)** and includes **Smoke, Sanity, and Regression** tests.

---

## 🔥 Test Categories

We categorize tests into three types:

### 1️⃣ **Smoke Tests**

- Verify if the critical functionalities of the app work after deployment.
- Run after every new build.

**Example Tests:**

- User can log in
- Homepage loads successfully
- Checkout process starts

📌 **Folder:** `tests/smoke/`

### 2️⃣ **Sanity Tests**

- Ensure recent changes, bug fixes, or minor updates do not break existing features.
- Run after bug fixes or new feature implementations.

**Example Tests:**

- Checkout flow after a bug fix
- Product details page after UI updates

📌 **Folder:** `tests/sanity/`

### 3️⃣ **Regression Tests**

- Ensure that new changes do not break any previously working functionalities.
- Run before releases.

**Example Tests:**

- User journey from login to checkout
- API responses remain unchanged
- UI elements render correctly across pages

📌 **Folder:** `tests/regression/`

---

## 🚀 Running Tests

# รันการทดสอบทั้งหมดแบบ End-to-End (E2E)

yarn playwright test

# แสดงผลในรูปแบบ HTML Report จากการรัน Playwright

yarn playwright show-report

# เปิดโหมด UI อินเทอร์แอคทีฟ เพื่อจัดการและตรวจสอบการทดสอบ

yarn playwright test --ui

# รันการทดสอบเฉพาะในไฟล์ที่ระบุ (ในตัวอย่างนี้คือไฟล์ example)

yarn playwright test example

# รันการทดสอบในโหมดดีบัก (Debug) เพื่อช่วยวิเคราะห์ปัญหา

yarn playwright test --debug

# ใช้ Codegen เพื่อสร้างโค้ดสำหรับการทดสอบโดยอัตโนมัติ

yarn playwright codegen

### **1️⃣ Install Dependencies**

```sh
yarn install
```
