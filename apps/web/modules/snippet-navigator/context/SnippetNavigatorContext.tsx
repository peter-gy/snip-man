/**
 * Possible actions to dispatch to the reducer
 */
import { ProgSnippetEntity, ProgTopicEntity } from '@snip-man/entities';
import { SnippetNavigatorState } from '../types/snippet-navigator.state';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { initialState } from '../data/initial-state';
import useFindProgTopicsByUserId from '../hooks/useFindProgTopicsByUserId';

type Action =
  | { type: 'setTopics'; data: ProgTopicEntity[] }
  | { type: 'setSelectedTopic'; data: ProgTopicEntity }
  | { type: 'setSnippets'; data: ProgSnippetEntity[] };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type SnippetNavigatorStateContextType = {
  state: SnippetNavigatorState;
  dispatch: Dispatch;
};

const SnippetNavigatorStateContext = createContext<
  SnippetNavigatorStateContextType | undefined
>(undefined);

function snippetNavigatorStateReducer(
  state: SnippetNavigatorState,
  action: Action
): SnippetNavigatorState {
  switch (action.type) {
    case 'setTopics':
      return { ...state, topics: action.data };
    case 'setSelectedTopic':
      return { ...state, selectedTopic: action.data };
    case 'setSnippets':
      return { ...state, snippets: action.data };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

type SnippetNavigatorStateProviderProps = {
  userId: string;
  children: ReactNode;
};

function SnippetNavigatorStateProvider({
  userId,
  children,
}: SnippetNavigatorStateProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(
    snippetNavigatorStateReducer,
    initialState
  );

  const { data } = useFindProgTopicsByUserId(userId);
  useEffect(() => {
    if (data?.data) {
      dispatch({ type: 'setTopics', data: data.data });
    }
  }, [data]);

  return (
    <SnippetNavigatorStateContext.Provider value={{ state, dispatch }}>
      {children}
    </SnippetNavigatorStateContext.Provider>
  );
}

function useSnippetNavigatorState(): SnippetNavigatorStateContextType {
  const context = useContext(SnippetNavigatorStateContext);

  if (context === undefined) {
    throw new Error(
      'useSnippetNavigatorState must be used within a SnippetNavigatorStateProvider'
    );
  }

  return context;
}

export { SnippetNavigatorStateProvider, useSnippetNavigatorState };
