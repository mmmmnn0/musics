import { createContext, useEffect, useReducer } from "react";

// 초기상태 정의
const INITIAL_STATE = {
    title: undefined,
    uploader: undefined,
    ...JSON.parse(localStorage.getItem("search")),
};

// 검색 컨텍스트 생성
export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem(
            "search",
            JSON.stringify({ title: state.title, uploader: state.uploader })
        );
    }, [state.title, state.uploader]);

    return (
        <SearchContext.Provider
            value={{
                title: state.title,
                uploader: state.uploader,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
