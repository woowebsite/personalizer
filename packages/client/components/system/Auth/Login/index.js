import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { signIn } from "next-auth/client";
import { useIntl } from "react-intl";
import SocialConenct from "~/features/SocialConnect";

import style from "../style.module.scss";

import Button from "components/Button";
import Form from "components/Form";
import Input from "components/Input";

import useTranslate from "hooks/useTranslate";

const { Item, useForm } = Form;

const Login = (props) => {
  const [form] = useForm();
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id }, values);

  const {
    user: { loading },
  } = props;

  const onSubmit = (data) => {
    form
      .validateFields()
      .then((values) => {
        signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/users/albums",
        });
      })
      .catch((errorInfo) => {
        console.log("Error: ", errorInfo);
      });
  };

  return (
    <div className={style.loginWrap}>
      <div className="text-center mb-5">
        <h1 className="mb-5">
          <strong>{t("signin.title")}</strong>
        </h1>
      </div>

      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 text-center mb-3">
          <strong>{t("signin.buttons.loginWithEmail")}</strong>
        </div>
        <Form
          form={form}
          id="loginForm"
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="mb-4"
        >
          <Item
            name="email"
            initialValue="wooowebsite@gmail.com"
            rules={[
              {
                required: true,
                message: useTranslate("validator.required", {
                  field: "signin.placeholder.email",
                }),
              },
            ]}
          >
            <Input size="large" placeholder={t("signin.placeholder.email")} />
          </Item>
          <Item
            name="password"
            initialValue="1"
            rules={[
              {
                required: true,
                message: useTranslate("validator.required", {
                  field: "signin.placeholder.password",
                }),
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={t("signin.placeholder.password")}
            />
          </Item>
          <Button
            form="loginForm"
            type="primary"
            size="large"
            className="text-center w-100"
            htmlType="submit"
            loading={loading}
            block
          >
            <strong>{t("signin.buttons.login")}</strong>
          </Button>
        </Form>
        <div className={style["forgot-pass"]}>
          <Link href="/auth/forgot-password">
            {t("signin.buttons.forgotPass")}
          </Link>
        </div>
      </div>
      <div className="text-center pt-2 mb-auto mt-4">
        <span className="mr-2">{t("signin.noAccount")}</span>
        <h4 className="mb-2">
          <strong>{t("signin.buttons.login")}</strong>
        </h4>
        <div className="d-flex justify-content-around">
          <SocialConenct visibleTwitter={false} />
        </div>
      </div>
    </div>
  );
};

export default connect(({ user, settings }) => ({ user }))(Login);
