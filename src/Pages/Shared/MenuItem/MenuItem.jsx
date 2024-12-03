

const MenuItem = ({item}) => {
    const {image,price,recipe,name} = item;
    return (
        <div className="flex space-x-4">
            <img className="w-[120px] rounded-se-[50px] rounded-es-[50px] rounded-ee-[50px]" src={image} alt="" />
            <div className="">
                <h3 className="uppercase">{name}----------</h3>
                <p className="">{recipe}</p>
            </div>
            <p className="text-yellow-50">{price}</p>
        </div>
    );
};

export default MenuItem;