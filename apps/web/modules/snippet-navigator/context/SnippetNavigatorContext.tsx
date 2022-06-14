/**
 * Possible actions to dispatch to the reducer
 */
import {
  ProgSnippetEntity,
  ProgSnippetPreview,
  ProgTopicEntity,
  ProgTopicWithSnippetPreviews,
} from '@snip-man/entities';
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
import useFindProgSnippetById from '../hooks/useFindProgSnippetById';

type Action =
  | { type: 'setTopics'; data: ProgTopicWithSnippetPreviews[] }
  | { type: 'setSelectedTopic'; data: ProgTopicEntity }
  | { type: 'setSelectedSnippetPreview'; data: ProgSnippetPreview }
  | { type: 'setSelectedSnippet'; data: ProgSnippetEntity };

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
    case 'setSelectedSnippetPreview':
      return { ...state, selectedSnippetPreview: action.data };
    case 'setSelectedSnippet':
      return { ...state, selectedSnippet: action.data };
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
      {state.selectedSnippetPreview?.id && (
        <SelectedSnippetFetcher id={state.selectedSnippetPreview.id} />
      )}
      {children}
    </SnippetNavigatorStateContext.Provider>
  );
}

function SelectedSnippetFetcher({ id }: { id: string }): JSX.Element {
  const { dispatch } = useSnippetNavigatorState();
  const { data } = useFindProgSnippetById(id);
  useEffect(() => {
    if (data?.data) {
      dispatch({ type: 'setSelectedSnippet', data: data.data });
    }
  }, [dispatch, data]);
  return <></>;
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
