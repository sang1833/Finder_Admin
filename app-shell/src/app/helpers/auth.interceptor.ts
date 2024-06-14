import { catchError, finalize, of } from 'rxjs';
import { CheckTokenService } from '../app.service';

export function appInitializer(authenticationService: CheckTokenService) {
  return () =>
    authenticationService.checkTokenExpiration().pipe(
      // catch error to start app on success or failure
      catchError(
        (
          error // eslint-disable-line @typescript-eslint/no-unused-vars
        ) => of(window.location.replace('http://localhost:4200/login'))
      )
    );
}
