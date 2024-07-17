import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import styles from "../styles/TopArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`https//morning-news-backend-five.vercel.app/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <Tooltip
          title={
            user.token
              ? "Bookmark article"
              : "Sign in to bookmark articles"
          }
          color="#f2b936"
          placement="right"
        >
          <FontAwesomeIcon
            icon={faBookmark}
            onClick={() => handleBookmarkClick()}
            style={iconStyle}
            className={styles.bookmarkIcon}
          />
        </Tooltip>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <a href={props.url} target="_blank">
          <Tooltip
            title="Read the article at the source"
            color="#f2b936"
            placement="bottom"
          >
            <p className={styles.description}>{props.description}</p>
          </Tooltip>
        </a>
        <h4 className={styles.articleDescription}>
          <span className={styles.source}>
            - {props.source && props.source.name}
          </span>
          <span>{props.author} -</span>
        </h4>
      </div>
    </div>
  );
}

export default TopArticle;
