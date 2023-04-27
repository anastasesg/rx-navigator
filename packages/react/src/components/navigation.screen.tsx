import React from 'react';
import { NavigationScreenProps } from '../types';

export abstract class NavigationScreen<TProps extends NavigationScreenProps<any, any>, TState = any> extends React.Component<TProps, TState> {}
