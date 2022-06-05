import { UserEntity } from '@snip-man/entities';
import { SnipManState } from '../types/snip-man-state.type';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { initialState } from '../data/initial-state';

/**
 * Possible actions to dispatch to the reducer
 */
type Action =
  | { type: 'setUser'; data: UserEntity }
  | { type: 'setDatabaseSource'; data: 'postgres' | 'mongo' };

/**
 * Dispatch callback signature
 */
type Dispatch = (action: Action) => void;

type SnipManStateContextType = { state: SnipManState; dispatch: Dispatch };

const SnipManStateContext = createContext<SnipManStateContextType | undefined>(
  undefined
);

function snipManStateReducer(
  state: SnipManState,
  action: Action
): SnipManState {
  switch (action.type) {
    case 'setUser':
      return { ...state, user: action.data };
    case 'setDatabaseSource':
      return { ...state, databaseSource: action.data };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

type SnipManStateProviderProps = { children: ReactNode };

function SnipManStateProvider({
  children,
}: SnipManStateProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(snipManStateReducer, initialState);

  return (
    <SnipManStateContext.Provider value={{ state, dispatch }}>
      {children}
    </SnipManStateContext.Provider>
  );
}

function useSnipManState(): SnipManStateContextType {
  const context = useContext(SnipManStateContext);

  if (context === undefined) {
    throw new Error(
      'useSnipManState must be used within a SnipManStateProvider'
    );
  }

  return context;
}

function useDatabaseSource(): 'postgres' | 'mongo' {
  const {
    state: { databaseSource },
  } = useSnipManState();
  return databaseSource;
}

export { SnipManStateProvider, useSnipManState, useDatabaseSource };
