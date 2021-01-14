

const Genres = (props) => {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
    return ( <div>
        <ul className="list-group">
            {items.map(item => <li onClick={() => onItemSelect(item) } key={item[valueProperty]} className={item === selectedItem ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>)}
            
        </ul>
    </div> );
};

Genres.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};
 
export default Genres;