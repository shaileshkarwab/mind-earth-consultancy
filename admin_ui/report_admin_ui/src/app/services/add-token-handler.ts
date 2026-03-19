import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "../features/no-auth/service/token.service";

export const addTokenHandler: HttpInterceptorFn = (request, next) => {
    const tokenService = inject(TokenService);
    var token = tokenService.getToken();

    if (!token) {
        return next(request);
    }

    const authReq = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq);
}