import React from "react";
import { render } from "@testing-library/react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const BuggyComponent = ({ shouldFail }) => {
  if (shouldFail) {
    throw new Error("Error from test component");
  }

  return <h1>Test Component</h1>;
};
test("renders learn react link", () => {
  const { queryByText } = render(
    <ErrorBoundary>
      <BuggyComponent shouldFail={true} />
    </ErrorBoundary>
  );
  const childComponent = queryByText("Test Component");

  expect(childComponent).toBeNull();
});
