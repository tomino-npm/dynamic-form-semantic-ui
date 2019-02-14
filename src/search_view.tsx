import * as React from 'react';

import { observer } from 'mobx-react';
import { SearchResultData, SearchProps, Input } from 'semantic-ui-react';

import { FormControlProps } from './common';
import { debounce } from '@tomino/toolbelt';
import { ErrorView } from './error_view';

type DropdownOption = {
  title: string;
  titles: string[];
  description?: string;
  image?: string;
  price?: string;
  value: string;
};

type State = {
  isLoading: boolean;
  value: string;
  options: DropdownOption[];
};

export class SearchComponent extends React.Component<FormControlProps, State> {
  async componentWillMount() {
    this.resetComponent();

    let value = this.props.owner.getValue(this.props.formControl.source);
    // we need to preload our value
    if (value != null) {
      this.setState({ isLoading: true });
      this.props.handlers
        .search(this.props.formControl.handler, '', value)
        .then((options: DropdownOption[]) => {
          // handle titles, make sure they are defined
          this.createTitles(options);

          this.setState({
            isLoading: false,
            value: options && options.length ? options[0].title : ''
          });
        });
    }
  }

  resetComponent = () => this.setState({ isLoading: false, options: [], value: '' });

  handleResultSelect = (_event: React.MouseEvent<HTMLDivElement>, { result }: SearchResultData) => {
    this.setState({ value: result.title });
    this.props.owner.setValue(this.props.formControl.source, result.value);
  };

  handleSearchChange = (_event: React.MouseEvent<HTMLElement>, { value }: SearchProps) => {
    this.setState({ isLoading: true, value });
    if (value.length < 1) return this.resetComponent();

    this.getResults(value);
  };

  createTitles(options: DropdownOption[]) {
    for (let option of options) {
      if (!option.title) {
        if (option.titles) {
          option.title = option.titles.join(' - ');
        } else {
          throw new Error('You need to provide title!');
        }
      }
    }
  }

  resultRenderer = (option: any) => {
    let control = this.props.formControl.renderer;
    let titles: string[] = option.titles || [option.title];

    titles.forEach((t, i) => (control = control.replace(`{${i}}`, t)));

    return <div dangerouslySetInnerHTML={{ __html: control }} />;
  };

  getResults = debounce((value: string) => {
    if (!this.props.handlers.search) {
      throw new Error('Missing handler: search(name: string): Options[]');
    }
    if (!this.props.formControl.handler) {
      throw new Error('You need to define a search name!');
    }
    this.props.handlers
      .search(this.props.formControl.handler, value)
      .then((options: DropdownOption[]) => {
        // handle titles, make sure they are defined
        this.createTitles(options);

        this.setState({
          isLoading: false,
          options
        });
      });
  }, 500);

  render() {
    const { isLoading, value, options } = this.state;

    if (this.props.readOnly) {
      return <Input disabled value={value} />;
    }

    return (
      <>
        <Input
          loading={isLoading}
          showNoResults={this.state.isLoading ? false : true}
          resultRenderer={this.props.formControl.renderer ? this.resultRenderer : undefined}
          results={options}
          value={value}
          {...this.props.formControl.controlProps || {}}
        />
        <ErrorView owner={this.props.owner} source={this.props.formControl.source} />
      </>
    );
  }
}

export const SearchView = observer(SearchComponent);
