class ApiError extends Error{
    constructor(statusCode, message=500){
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor);

    }
}

export {ApiError}