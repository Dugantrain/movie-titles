import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TitleStore from '../store/title-search';

// At runtime, Redux will merge together...
type TitleSearchProps =
  TitleStore.TitleState // ... state we've requested from the Redux store
  & typeof TitleStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ searchText: string }>; // ... plus incoming routing parameters


class TitleSearch extends React.PureComponent<TitleSearchProps> {


  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.props.requestTitleSearch('');
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Titles</h1>
        {this.renderTitlesTable()}
        {/*{this.renderPagination()}*/}
      </React.Fragment>
    );
  }

  private renderTitlesTable() {
    return (
      <div>
        <div className="row mb-2">
          <input className="col-md-6" type="text" placeholder="Search by title" onKeyUp={(e) => this.props.requestTitleSearch(e.target.value)} />
        </div>
        {!this.props.isLoading &&
          <div className="row">
            {
              this.props.titles.map((title: TitleStore.Title) =>
                <div className="card col-md-4 mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{title.titleName} ({title.releaseYear})</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" >Details</a>
                  </div>
                </div>
              )}
          </div>
        }
        {this.props.isLoading &&
          <div className="row justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.titles, // Selects which state properties are merged into the component's props
  TitleStore.actionCreators // Selects which action creators are merged into the component's props
)(TitleSearch as any);
