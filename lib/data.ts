export const NavItems = [
    {
        title:'products',
        to:'/products'
    },
    {
        title:'about',
        to:'/about'
    },
    {
        title:'pricing',
        to:'/pricing'
    }
]

export const dateFormat = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
    });
};

export const timeFormat = (date: Date): string => {
    return new Date(date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
};
