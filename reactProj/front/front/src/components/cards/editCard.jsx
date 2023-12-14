import PageHeader from "../common/pageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Joi from "joi";
import Input from "../common/input";
import { useFormik } from "formik";
import cardServices, {
  createCard,
  updateCard,
} from "../../services/cardServices";
import { useCard } from "../../hooks/useCard";

export const EditCard = ({ redirect = "/MyCards" }) => {
  const [serverErr, setServerErr] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { card } = useCard(id);
  console.log(card);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: null,
    },
    // {
    //   "title": "a wonderful new card",
    //   "subtitle": "a test value for this card",
    //   "description": "a test value for new card\na test value for new card\n",
    //   "phone": "012-3211234",
    //   "email": "qwe@gmail.com",
    //   "web": "www.bing.com",
    //   "image": {
    //     "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
    //     "alt": "image of something"
    //   },
    //   "address": {
    //     "state": "IL",
    //     "country": "Israel",
    //     "city": "Arad",
    //     "street": "Shoham",
    //     "houseNumber": 5,
    //     "zip": 8920435
    //   }
    validate(values) {
      const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(2).max(1024).required(),

        phone: Joi.string()
          .regex(/^0[2-9]\d{7,8}$/)
          .messages({
            "string.pattern.base": `"phone" must be a standard Israeli phone number `,
          })
          .required(),

        email: Joi.string()
          .min(5)
          .required()
          .email({ tlds: { allow: false } }),
        web: Joi.string()
          .min(14)
          .allow("")
          .regex(
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
          )
          .messages({
            "string.pattern.base": `"Wev" must be a valid web Url `,
          }),

        url: Joi.string().min(14).allow(""),
        alt: Joi.string().min(2).max(256).allow(""),

        state: Joi.string().min(2).max(256).allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().min(1).required(),
        zip: Joi.number().allow(""),
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
        await updateCard(id, {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,

          phone: values.phone,
          email: values.email,
          web: values.web,
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
        });

        if (redirect) {
          navigate(redirect);
        }
      } catch (err) {
        setServerErr(err.response.data);
      }
    },
  });

  useEffect(() => {
    if (!card) {
      return;
    }

    const { title, subtitle, description, phone, email, web, image, address } =
      card;

    form.setValues({
      title,
      subtitle,
      description,
      phone,
      email,
      web,

      url: image.url,
      alt: image.alt,

      state: address.state,
      country: address.country,
      city: address.city,
      street: address.street,
      houseNumber: address.houseNumber,
      zip: address.zip,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <>
      <PageHeader
        title="Create Card"
        description="Ready to embark on this exciting digital journey? Excellent choice! Join the ranks of savvy professionals making their mark in style. Sign up now and unlock a world of possibilities. Let's get you started on your quest for the perfect online business card."
      />

      <div className=" mb-3">
        <div className="row ">
          <form onSubmit={form.handleSubmit}>
            {serverErr && <div className="alert alert-danger">{serverErr}</div>}

            <div className="col-12">
              <Input
                {...form.getFieldProps("title")}
                type="text"
                label="Title "
                required
                error={form.touched.title && form.errors.title}
              />
              <Input
                {...form.getFieldProps("subtitle")}
                type="text"
                label="Subtitle "
                required
                error={form.touched.subtitle && form.errors.subtitle}
              />
              <Input
                {...form.getFieldProps("description")}
                type="text"
                label="Description "
                required
                error={form.touched.description && form.errors.description}
              />
              <Input
                {...form.getFieldProps("phone")}
                type="text"
                label="Phone Number"
                required
                error={form.touched.phone && form.errors.phone}
              />
              <Input
                {...form.getFieldProps("email")}
                type="email"
                label="Email"
                required
                error={form.touched.email && form.errors.email}
              />
              <Input
                {...form.getFieldProps("web")}
                type="text"
                label="Web"
                error={form.touched.web && form.errors.web}
              />
            </div>
            <div className="col-12">
              <hr className="w-50 mt-5" />

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
                error={form.touched.zip && form.errors.zip}
              />
            </div>
            <button
              disabled={!form.isValid}
              type="submit"
              className="btn btn-primary"
            >
              Update Card
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
