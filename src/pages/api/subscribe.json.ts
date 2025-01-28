export const prerender = false;

import type { APIRoute } from "astro";
import { validateEmail } from "../../lib/utils";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // check that email exists
    if (!email) {
      throw new Error("Please provide an email");
    }

    // validate email
    if (!validateEmail(email as string)) {
      throw new Error("Please provide an email");
    }

    const API_KEY = import.meta.env.CONVERT_KIT_API_KEY;
    const FORM_ID = import.meta.env.CONVERT_KIT_FORM_ID;
    const API = "https://api.convertkit.com/v3";

    // make sure to change the FORM ID from the Local First Academy website to
    // Functional Mastery form id.
    const subRes = await fetch(`${API}/forms/${FORM_ID}/subscribe`, {
      method: "post",
      body: JSON.stringify({ email, api_key: API_KEY }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (!subRes.ok) {
      throw new Error("Big Yikes!");
    }
    const subData = await subRes.json();

    const isSubscribed = subData.subscription.state === "active";

    if (isSubscribed) {
      return new Response(
        JSON.stringify({
          message: "🥳 You’re already subscribed!",
        }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    }

    return new Response(
      JSON.stringify({
        message:
          "👀 Thanks! Please check your email to confirm your subscription.",
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return new Response(null, {
        status: 400,
        statusText: e.message,
      });
    }
    return new Response(null, {
      status: 400,
      statusText: "There is an unexpected error",
    });
  }
};
