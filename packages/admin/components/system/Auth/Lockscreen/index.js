import React from "react";
import Link from "next/link";
import style from "../style.module.scss";

import Form from "components/Button";
import Button from "components/Button";
import Input from "components/Input";

const { Item } = Form;

@Form.create()
class Lockscreen extends React.Component {
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
          <div className="text-dark text-center font-size-24 mb-4">
            <strong>{t("lockScreen.accountLocked")}</strong>
          </div>
          <div className="text-center">
            <div className="kit__utils__avatar kit__utils__avatar--size64 d-inline-block mb-2">
              <img src="resources/images/avatars/2.jpg" alt="Mary Stanform" />
            </div>
            <div className="font-size-18 text-dark mb-4">
              <strong>{t("lockScreen.maryStanform")}</strong>
            </div>
          </div>
          <Form
            layout="vertical"
            hideRequiredMark
            onSubmit={this.onSubmit}
            className="mb-4"
          >
            <Item>
              {form.getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: useTranslate("validator.required", {
                      field: "lockScreen.placeholder.password",
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={t("lockScreen.placeholder.password")}
                />
              )}
            </Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="text-center w-100"
            >
              <strong>{t("lockScreen.unlockAccount")}</strong>
            </Button>
          </Form>
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

export default Lockscreen;
