import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, email, password } = await request.json();

  const res = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json({ jwt: data.jwt, user: data.user });
  } else {
    return NextResponse.json(data, { status: res.status });
  }
}
