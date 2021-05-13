import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Title } from './title-search';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TitleState {
    isLoading: boolean;
    titleDetail: TitleDetail;
}

export interface TitleDetail {
    title: Title;
    storyLines: StoryLine[]
}

export interface StoryLine {
    titleId: number;
    language: string;
    description: string;
    id: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTitleAction {
    type: 'REQUEST_TITLE';
    titleId: string;
}

interface ReceiveTitleAction {
    type: 'RECEIVE_TITLE';
    titleDetail: TitleDetail;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTitleAction | ReceiveTitleAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTitleById: (titleId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.titles) {
            fetch(`title/` + titleId)
                .then(response => response.json() as Promise<TitleDetail>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TITLE', titleDetail: data });
                });

            dispatch({ type: 'REQUEST_TITLE', titleId: titleId });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TitleState = { titleDetail: {title:{}, storyLines:[]}, isLoading: false };

export const reducer: Reducer<TitleState> = (state: TitleState | undefined, incomingAction: Action): TitleState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TITLE':
            return {
                titleDetail: state.titleDetail,
                isLoading: true
            };
        case 'RECEIVE_TITLE':
            return {
                titleDetail: action.titleDetail,
                isLoading: false
            };
            break;
    }

    return state;
};