import { NextResponse } from 'next/server';

type ResponseMessage = string | Record<string, string[] | undefined>;
// ANCHOR - 200
export const sendSuccess = <TData = unknown>({
  message,
  data,
}: {
  message: ResponseMessage;
  data: TData;
}) => {
  return NextResponse.json(
    {
      status: true,
      message,
      data,
    },
    { status: 200 },
  );
};

export const sendCreated = <TData = unknown>({
  message,
  data,
}: {
  message: ResponseMessage;
  data: TData;
}) => {
  return NextResponse.json(
    {
      status: true,
      message,
      data,
    },
    { status: 201 },
  );
};

// ANCHOR - 400
export const sendBadRequest = (message: ResponseMessage = 'Bad Request') => {
  return NextResponse.json(
    {
      status: false,
      message,
    },
    { status: 400 },
  );
};

// ANCHOR - 401
export const sendUnauthorized = (message: ResponseMessage = 'Unauthorized') => {
  return NextResponse.json(
    {
      status: false,
      message,
    },
    { status: 401 },
  );
};

// ANCHOR - 404
export const sendNotFound = (message: ResponseMessage = 'Not Found') => {
  return NextResponse.json(
    {
      status: false,
      message,
    },
    { status: 404 },
  );
};

// ANCHOR - 409
export const sendConflict = (
  message: ResponseMessage = 'Conflict',
) => {
  return NextResponse.json(
    {
      status: false,
      message,
    },
    { status: 409 },
  );
};


// ANCHOR - 500
export const sendInternalServer = (
  message: ResponseMessage = 'Internal Server Error',
) => {
  return NextResponse.json(
    {
      status: false,
      message,
    },
    { status: 500 },
  );
};
