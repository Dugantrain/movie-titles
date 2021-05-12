import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TitleState {
    isLoading: boolean;
    titles: Title[];
    searchText: string;
}

export interface Title {
    titleId: number;
    titleName: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTitleSearchAction {
    type: 'REQUEST_TITLE_SEARCH';
    searchText: string;
}

interface ReceiveTitleSearchAction {
    type: 'RECEIVE_TITLE_SEARCH';
    titles: Title[];
    searchText: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTitleSearchAction | ReceiveTitleSearchAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTitleSearch: (searchText: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.titles && searchText !== appState.titles.searchText) {
            fetch(`title/search/` + searchText)
                .then(response => response.json() as Promise<Title[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TITLE_SEARCH', titles: data, searchText: appState.titles.searchText });
                });

            dispatch({ type: 'REQUEST_TITLE_SEARCH', searchText: searchText  });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TitleState = { titles: [], isLoading: false, searchText: '' };

export const reducer: Reducer<TitleState> = (state: TitleState | undefined, incomingAction: Action): TitleState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TITLE_SEARCH':
            return {
                titles: state.titles,
                isLoading: true,
                searchText: action.searchText
            };
        case 'RECEIVE_TITLE_SEARCH':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.searchText === state.searchText) {
                return {
                    searchText: state.searchText,
                    titles: action.titles,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
