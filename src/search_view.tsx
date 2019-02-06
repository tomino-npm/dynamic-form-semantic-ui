import * as React from 'react';

import { observer } from 'mobx-react';
import { Search, SearchResultData, SearchProps } from 'semantic-ui-react';

import { FormControlProps } from './common';
import { debounce } from '@tomino/toolbelt';

type Result = {
  title: string;
  description?: string;
  image?: string;
  price?: string;
  value: string;
};

type State = {
  isLoading: boolean;
  value: string;
  results: Result[];
};

export class SearchComponent extends React.Component<FormControlProps, State> {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (_event: React.MouseEvent<HTMLDivElement>, { result }: SearchResultData) => {
    this.setState({ value: result.title });
    this.props.owner.setValue(this.props.formControl.source, result.value.toString());
  };

  handleSearchChange = async (_event: React.MouseEvent<HTMLElement>, { value }: SearchProps) => {
    this.setState({ isLoading: true, value });
    if (value.length < 1) return this.resetComponent();

    this.getResults(value);
  };

  getResults = debounce(async (value: string) => {
    console.log('Searching');
    const results = await this.props.handlers[this.props.formControl.handler](value);

    this.setState({
      isLoading: false,
      results
    });
  }, 500);

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          showNoResults={this.state.isLoading ? false : true}
          resultRenderer={this.props.formControl.renderer}
          results={results}
          value={value}
          {...this.props.formControl.controlProps || {}}
        />
      </>
    );
  }
}

export const SearchView = observer(SearchComponent);
