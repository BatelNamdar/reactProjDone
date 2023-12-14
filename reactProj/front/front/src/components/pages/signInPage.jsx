import Input from "../common/input";
import PageHeader from "../common/pageHeader";
import Joi from "joi";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth.context";

const SignInPage = ({ redirect = "/" }) => {
  const { login } = useAuth();
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(2)
          .max(255)
          .required()
          .email({ tlds: { allow: false } }),

        password: Joi.string()
          .min(9)
          .max(1024)
          .regex(
            /^(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/
          )
          .message(
            "Password must have at least 4 numbers, one uppercase letter, one lowercase letter, one special character, and be 8 to 20 characters long."
          ),
      });
      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];

        errors[key] = detail.message;
      }
      return errors;
    },

    async onSubmit(values) {
      try {
        login({ ...values });

        if (redirect) {
          navigate(redirect);
        }
      } catch (err) {
        setServerErr(err.response.data);
      }
    },
  });
  return (
    <>
      <PageHeader
        title="Sign In"
        description="Welcome back, trendsetter! We've missed you. Time to reignite your digital presence. Sign in and regain access to your virtual identity. It's a world of connections waiting for you, and your digital business card is just a click away."
      />
      Dont Have An Account Yet?
      <button className="btn btn-warning ms-3 ">
        <Link className="text-dark" to={"/SignUp"}>
          SignUp
        </Link>
      </button>
      <div className=" mb-3">
        <div className="row ">
          <form onSubmit={form.handleSubmit}>
            {serverErr && <div className="alert alert-danger">{serverErr}</div>}

            <div className="col-12">
              <Input
                {...form.getFieldProps("email")}
                type="email"
                label="Email"
                required
                error={form.touched.email && form.errors.email}
              />

              <Input
                {...form.getFieldProps("password")}
                type="password"
                name="password"
                label="Password"
                required
                error={form.touched.password && form.errors.password}
              />
            </div>
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-primary"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
