import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import Genres from './common/listGroup';
import { getGenres } from "../services/fakeGenreService";
import _ from 'lodash';
import TableHeader from './common/tableHeader';


class Movies extends Component {

    columns =[
        {path:'title', label: 'Title'},
        {path:'genre.name', label: 'Genre'},
        {path:'numberInStock', label: 'Stock'},
        {path:'dailyRentalRate', label: 'Rate'},
        {},
        {}
    ];
    
    state = { 
        movies: getMovies(),
        pagiClasses: "page-item page-link",
        pageSize: 4,
        currentPage: 1,
        genres: getGenres(),
        sortColumn: { path: 'title', order: 'asc'}


        
     };

     componentDidMount(){
         const genres = [{_id:"", name: "All Genres"}, ...getGenres()];

         this.setState({ movies: getMovies(), genres });
     }

     handleDelete = movie => {

        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});

         




     };

     handleLike =(movie) => {
         
         const movies = [...this.state.movies];
         const index = movies.indexOf(movie);
         movies[index] = {...movies[index]};
         movies[index].liked = !movies[index].liked;
         this.setState({ movies });
     };

     handlePagination = page => {

        this.setState({currentPage: page});

        
        // this.state.pagiClasses += " active"



     };

     handleGenreSelect = genre =>{
         this.setState({ selectedGenre: genre, currentPage: 1 });
         

     };

     handleSort = sortColumn => {
        
          this.setState({ sortColumn });



     };

    render() { 
        const {pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state;
        
        const { length: count } = this.state.movies;

        if(count === 0)
            return <p>there are no movies in the datbase</p>

            const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;


              const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);


            const movies = paginate(sorted, currentPage, pageSize);
        

        return ( <div className="row">
            <div className="col-2">
                <Genres selectedItem={this.state.selectedGenre} items={this.state.genres} onItemSelect={this.handleGenreSelect} />
        
        
    
                </div>
            <div className="col">
            <p>Showing {filtered.length} movies in the database</p>
            
            <MoviesTable movies={movies}
                         onLike={this.handleLike} 
                         onDelete={this.handleDelete} 
                         onSort={this.handleSort}
                         sortColumn={sortColumn}
                         />
            
        <Pagination currentPage={currentPage} itemsCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePagination} classes={this.state.pagiClasses} />
            </div>
            
            
            
    
    </div>
        )
    }
}
 
export default Movies;