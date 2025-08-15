





const asyncHandler = (fn) => {

    return (req, res ,next)=>{   //fn ki req res next hai
        Promise.resolve(fn(req, res, next)).catch((err)=>next(err));
}}
  export {asyncHandler};