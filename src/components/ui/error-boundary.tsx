'use client';

import { Component, ReactNode } from 'react';
import { ExclamationTriangleIcon as AlertTriangleIcon, ArrowPathIcon as RefreshCwIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <AlertTriangleIcon className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              An unexpected error occurred while loading this content.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm font-medium">
                  Error details
                </summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack && '\n' + this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Try again</span>
            </button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}