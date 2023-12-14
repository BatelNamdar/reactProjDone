import PageHeader from "../common/pageHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Joi from "joi";
import Input from "../common/input";
import { useFormik } from "formik";
import { useAuth } from "../../context/auth.context";

const SignUpBiz = ({ redirect }) => {
  const {login, signUp} = useAuth()
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      first: "",
      middle: "",
      last: "",

      phone: "",
      email: "",
      password: "",

      url: "",
      alt: "",

      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",

      isBusiness: true,
    },
    // {
    //   "name": {
    //     "first": "Ell",
    //     "middle": "",
    //     "last": "Vis"
    //   },
    //   "phone": "0512345567",
    //   "email": "ellvis@email.com",
    //   "password": "Abc!123Abc",
    //   "image": {
    //     "url": "",
    //     "alt": ""
    //   },
    //   "address": {
    //     "state": "IL",
    //     "country": "Israel",
    //     "city": "Arad",
    //     "street": "Shoham",
    //     "houseNumber": 5,
    //     "zip": 8920435
    //   },
    //   "isBusiness": true
    // }

    validate(values) {
      const schema = Joi.object({
        first: Joi.string().min(2).max(256).required().label("First Name"),
        middle: Joi.string().min(2).max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),

        phone: Joi.string()
          .regex(/^0[2-9]\d{7,8}$/)
          .messages({
            "string.pattern.base": `"phone" must be a standard Israeli phone number `,
          })
          .required(),

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

        url: Joi.string().min(14).allow(""),
        alt: Joi.string().min(2).max(256).allow(""),

        state: Joi.string().min(2).max(256).allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.string().min(2).max(256).required(),
        zip: Joi.string().min(2).max(256).required(),

        isBusiness: Joi.boolean().required(),
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
        await signUp({
          name: {
            first: values.first,
            middle: values.middle,
            last: values.last,
          },
          phone: values.phone,
          email: values.email,
          password: values.password,
          image: {
            url: values.url,
            alt: values.alt,
          },
          address: {
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
            zip: values.zip,
          },
          isBusiness: true,
        });
        await login({ email: values.email, password: values.password });

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
        title="Sign Up Business"
        description="Calling all businesses, big and small! Elevate your professional presence with our tailored business solutions. Sign up today to unlock a realm of digital possibilities. From customizable templates to seamless team collaboration, our platform is designed to amplify your brand's impact. Join the digital evolution – where business meets brilliance!

        "
      />

      <div className=" mb-3">
        <div className="row ">
          <form onSubmit={form.handleSubmit}>
            {serverErr && <div className="alert alert-danger">{serverErr}</div>}

            <div className="col-12">
              <Input
                {...form.getFieldProps("first")}
                type="text"
                label="First Name"
                required
                error={form.touched.first && form.errors.first}
              />
              <Input
                {...form.getFieldProps("middle")}
                type="text"
                label="Middle Name"
                error={form.touched.middle && form.errors.middle}
              />
              <Input
                {...form.getFieldProps("last")}
                type="text"
                label="Last Name"
                required
                error={form.touched.last && form.errors.last}
              />
              <Input
                {...form.getFieldProps("email")}
                type="email"
                label="Email"
                required
                error={form.touched.email && form.errors.email}
              />
              <Input
                {...form.getFieldProps("phone")}
                type="text"
                label="Phone Number"
                required
                error={form.touched.phone && form.errors.phone}
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
            <div className="col-12">
              <hr className="w-50 mt-5" />
              <h3>profile image</h3>
              <hr className="w-50 mb-5" />
              <Input
                {...form.getFieldProps("url")}
                type="text"
                label="Image Url"
                error={form.touched.url && form.errors.url}
              />
              <Input
                {...form.getFieldProps("alt")}
                type="text"
                label="Image Alt"
                error={form.touched.alt && form.errors.alt}
              />
              <hr className="w-50 mt-5" />
              <h3>address</h3>
              <hr className="w-50 mb-5" />

              <Input
                {...form.getFieldProps("state")}
                type="text"
                label="State "
                error={form.touched.last && form.errors.last}
              />
              <Input
                {...form.getFieldProps("country")}
                type="text"
                label="Country"
                required
                error={form.touched.country && form.errors.country}
              />

              <Input
                {...form.getFieldProps("city")}
                type="text"
                label="City"
                required
                error={form.touched.city && form.errors.city}
              />
              <Input
                {...form.getFieldProps("street")}
                type="text"
                label="street"
                required
                error={form.touched.street && form.errors.street}
              />
              <Input
                {...form.getFieldProps("houseNumber")}
                type="text"
                label="House Number"
                required
                error={form.touched.houseNumber && form.errors.houseNumber}
              />
              <Input
                {...form.getFieldProps("zip")}
                type="text"
                label="Zip Code"
                required
                error={form.touched.zip && form.errors.zip}
              />
            </div>
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpBiz;
