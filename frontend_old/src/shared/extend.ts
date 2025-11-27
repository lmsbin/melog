import { Location } from 'react-router-dom';

export interface LocationState {
    fromSearchPage?: boolean;
}

export interface MelogLocation extends Location<LocationState> {}
