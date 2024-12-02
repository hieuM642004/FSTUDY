function WapperItemCard({children ,stylecss }: string | any) {
    return ( <div className={`bg-white rounded-lg p-4 shadow-lg border-2 lg:w-[47rem] mb-10 ${stylecss}`}>
        {children}
    </div> );
}

export default WapperItemCard;