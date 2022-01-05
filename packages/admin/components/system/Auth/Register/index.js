import React from "react";
import Link from "next/link";
import style from "../style.module.scss";

import Form from "components/Form";
import Input from "components/Input";
import Button from "components/Button";

import useTranslate from "hooks/useTranslate";

const { Item } = Form;

@Form.create()
class Register extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values);
      }
    });
  };

  render() {
    const { form } = this.props;

    return (
      <div>
        <div className={`card ${style.container}`}>
          <div className="text-dark font-size-24 mb-4">
            <strong>Create your account</strong>
          </div>
          <div className="mb-4">
            <p>
              And start spending more time on your projects and less time
              managing your infrastructure.
            </p>
          </div>
          <Form
            layout="vertical"
            hideRequiredMark
            onSubmit={this.onSubmit}
            className="mb-4"
          >
            <Item>
              {form.getFieldDecorator("fullname", {
                rules: [
                  {
                    required: true,
                    message: useTranslate("validator.required", {
                      field: "registerPage.labels.fullname",
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={t("registerPage.placeholder.fullname")}
                />
              )}
            </Item>
            <Item>
              {form.getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: useTranslate("validator.required", {
                      field: "registerPage.labels.email",
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={t("registerPage.placeholder.email")}
                />
              )}
            </Item>
            <Item>
              {form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: useTranslate("validator.required", {
                      field: "registerPage.labels.password",
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={t("registerPage.placeholder.password")}
                />
              )}
            </Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-center w-100"
            >
              <strong>{t("registerPage.buttons.signup")}</strong>
            </Button>
          </Form>
          <div>
            <span className="mr-1">{t("registerPage.text.term1")}</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="kit__utils__link"
            >
              {t("registerPage.text.term2")}
            </a>{" "}
            {t("registerPage.text.term3")}{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="kit__utils__link"
            >
              {t("registerPage.text.term4")}
            </a>
          </div>
        </div>
        <div className="text-center pt-2 mb-auto">
          <span className="mr-2">{t("lockScreen.haveAccount")}</span>
          <Link href="/auth/login" className="kit__utils__link font-size-16">
            {t("buttons.backToLogin")}
          </Link>
        </div>
      </div>
    );
  }
}

export default Register;
