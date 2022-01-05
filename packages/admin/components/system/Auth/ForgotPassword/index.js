import React from "react";
import Link from "next/link";
import style from "../style.module.scss";

import Form from "components/Form";
import Input from "components/Input";
import Button from "components/Button";

const { Item } = Form;

@Form.create()
class ForgotPassword extends React.Component {
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
            <strong>{t("menu.settings.changePassword")}</strong>
          </div>
          <Form
            layout="vertical"
            hideRequiredMark
            onSubmit={this.onSubmit}
            className="mb-4"
          >
            <Item>
              {form.getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: useTranslate("validator.required", {
                      field: "customerTable.columns.facebook",
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={t("changePasswordForm.placeholder.email")}
                />
              )}
            </Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-center w-100"
            >
              <strong>{t("changePasswordForm.buttons.resetPassword")}</strong>
            </Button>
          </Form>
          <Link href="/auth/login" className="kit__utils__link font-size-16">
            <i className="fe fe-arrow-left mr-1 align-middle" />
            {t("buttons.backToLogin")}
          </Link>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
