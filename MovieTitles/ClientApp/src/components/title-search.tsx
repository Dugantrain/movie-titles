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
        <p>Enter text to begin filtering.</p>
            {this.renderTitlesTable()}
        {/*{this.renderPagination()}*/}
      </React.Fragment>
    );
  }

  private renderTitlesTable() {
      return (
          <div>
              <input type="text"  onKeyUp={(e) => this.props.requestTitleSearch(e.target.value)}/>
              <table className='table table-striped' aria-labelledby="tabelLabel">
                  <thead>
                  <tr>
                      <th>Id</th>
                          <th>Title</th>
                          <th>Released</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.titles.map((title: TitleStore.Title) =>
                      <tr key={title.titleId}>
                          <td>{title.titleId}</td>
                          <td>{title.titleName}</td>
                          <td>{title.releaseYear}</td>
                      </tr>
                  )}
                  </tbody>
              </table>
          </div>
    );
  }

  //private renderPagination() {
  //  const prevStartDateIndex = (this.props.startIndex || 0) - 5;
  //    const nextStartDateIndex = (this.props.startIndex || 0) + 5;

  //  return (
  //    <div className="d-flex justify-content-between">
  //      <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
  //      {this.props.isLoading && <span>Loading...</span>}
  //      <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
  //    </div>
  //  );
  //}
}

export default connect(
  (state: ApplicationState) => state.titles, // Selects which state properties are merged into the component's props
  TitleStore.actionCreators // Selects which action creators are merged into the component's props
)(TitleSearch as any);
