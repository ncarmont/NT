import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ArticlesCollection from '../../../api/Articles/Articles';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledIndex = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

// const handleRemove = (articleId) => {
//   if (confirm('Are you sure? This is permanent!')) {
//     Meteor.call('articles.remove', articleId, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         Bert.alert('Article deleted!', 'success');
//       }
//     });
//   }
// };

const Index = ({
  loading, articles, match, history,
}) => (!loading ? (
  <StyledIndex>
    <div className="page-header clearfix">
      <h4 className="pull-left">Articles</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Article</Link>
    </div>
    {articles.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {articles.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of Articles, friend!"
        subtitle="Add your first Article by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Article',
        }}
      />}
  </StyledIndex>
) : <Loading />);

Index.propTypes = {
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('articles');
  return {
    loading: !subscription.ready(),
    articles: ArticlesCollection.find().fetch(),
  };
})(Index);
// ----------------------------------------------------------------------
// OLI STUFF
// --------------------------------------------------------------------


// const StyledIndex = styled.div`
//
//
// .toolTipLowerHr {
//   height:2px;
// }
//
// .tooltipStoriesSpacing {
// margin-bottom:5px; clear:both;
// }
//
// .colorFeaturedHr {
// width:23px; height:0.9mm; color:#000; border:none; margin-left:3px; margin-bottom:-2px;
// }
//
// .topFirstArticlePhoto {
//
// margin-left:49.5px;
//
// }
//
// .featuredTopText {
// color:#15a05c;
// font-size:1.145em;
// font-family:sans-serif;
// letter-spacing:0.028em;
// font-weight:550;
// margin-top:2.5px;
// transition:0.15s;
// width:110px;
// margin-left:2px;
// }
// .colorFeaturedHr {
// background-color:#15a05c;
// transition:0.15s;
// }
// .featuredTop {
// cursor:pointer;
// display:block;
//
// }
// .featuredTop:hover .colorFeaturedHr {
// background-color:#000;
// transition:0.25s;
// }
// .featuredTop:hover .featuredTopText {
//  color:#000;
//  transition:0.25s;
// }
//
//
// .leftSideHomeTop {
//  float:left;
// }
// .middleSideHomeTop {
// float:left;
// margin-top:3px;
// margin-left:-155px;
// }
// .rightSideHomeTop {
// float:left;
// margin-left:100px;
// margin-top:6px;
// margin-right:-20px;
// }
// .posAuthorRightSideTop {
// margin-bottom:20px;
// font-weight:500;
// font-size:0.865em;
// margin-left:6px;
// }
// .topFeaturedHomeRight {
// width:260px;
// font-size:1.35em;
// line-height:1.25;
// margin-top:0px;
// margin-left:300px;
// cursor:pointer;
// transition:0.25s;
// }
// .middleSectionTopTitle {
// position:absolute;
// margin-left:202px;
// width:285px;
// margin-top:10px;
// word-spacing:0.025em;
// letter-spacing:0.018em;
// font-size:1.75em;
// font-weight:550;
// cursor:pointer;
// display:block;
// transition:0.3s;
// }
// .middleSectionTopTitle1 {
// position:absolute;
// margin-left:232px;
// width:285px;
// color:#000;
// margin-top:19px;
// font-size:1.13em;
// font-family:sans-serif;
// word-spacing:-0em;
// letter-spacing:-0.01em;
// font-weight:550;
// cursor:pointer;
// display:block;
// transition:0.3s;
// }
// #middleTooltipStyle1 {
// margin-top:90px;
// margin-left:202px;
// font-weight:400;
// font-size:0.865em;
// letter-spacing:0.047em;
// }
// #middleTooltipStyle2 {
// margin-top:70px;
// margin-left:202px;
// font-weight:400;
// font-size:0.865em;
// letter-spacing:0.047em;
// }
// #middleTooltipStyle3 {
// margin-top:70px;
// margin-left:202px;
// font-weight:400;
// font-size:0.865em;
// letter-spacing:0.047em;
// }
// .middleSubArticle {
//   position:absolute;
//   color:#7d7d7d;
//   letter-spacing:0.045em;
//   font-weight:400;
//   margin-left:202px;
//   margin-top:101px;
//   width:450px;
//   font-size:0.868em;
// }
// .middleSubArticle2 {
//   position:absolute;
//   color:#7d7d7d;
//   letter-spacing:0.045em;
//   font-weight:300;
//   margin-left:202px;
//   margin-top:100px;
//   width:450px;
//   font-size:0.988em;
// }
// .topFeaturedHome {
// width:388px;
// font-size:1.94em;
// font-family:sans-serif;
// word-spacing:-0.01em;
// letter-spacing:0.018em;
// line-height:1.25;
// font-weight:550;
// margin-bottom:44px;
// margin-top:7px;
// display:block;
// color:#000;
// cursor:pointer;
// transition:0.3s;
// }
// .greenHov:hover {
// color:#15a05c;
// }
// /********************************************************************/
//
// .topHomeTooltip {
//   padding-bottom:-8px;
//   margin-bottom:-8px;
//   margin-left:-51px;
//   /* background-color:#8a4; */
// }
//
// .topHomeTooltip .topHomeTooltiptext {
//   visibility: hidden;
//   width: 280px;
//   height:364px; /* 349px */
//   background-color: #ffffff;
//   color:#000000;
//   border-radius: 6px;
//   padding: 5px 0;
//   position: absolute; /*ab*/
//   top: 150.5px; /* 104px */ /* 241.5 (very very v v v recent) */
//   left: 0.6%;
// border: 1px solid #dcdcdc;
//   transition-delay: 0.8s; /* 0.55 */
//   z-index:10005;
//
//  -webkit-box-shadow: 0px 2px 1px -1px #d2d2d2;
//  -moz-box-shadow:    0px 2px 1px -1px #d2d2d2;
//  box-shadow:         0px 2px 1px -1px #d2d2d2;
// }
// .topHomeTooltip .topHomeTooltiptext::after {
//   content: "";
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   margin-left: -5px;
//   z-index:10004;
//
// }
// .topHomeBelowTooltipborder {
//   visibility:hidden;
//   content: "";
//   position: absolute;
//   top: 28.2%; /* 64.8% */
//   left: 5%;
//   margin-left: -5px;
//   border-width: 8px;
//   border-style: solid;
//   border-color: transparent transparent #ffffff transparent;
//   transition-delay: 0.8s; /* 0.55 */
//   z-index:10006;
// }
// .topHomeTooltipborder {
//   visibility:hidden;
//   content: "";
//   position: absolute;
//   top: 27.5%; /* 64.8% */
//   left: 4.9%;
//   margin-left: -5px;
//   border-width: 10px;
//   border-style: solid;
//   border-color: transparent transparent #dcdcdc transparent;
//   transition-delay: 0.8s; /* 0.55 */
//   z-index:10004;
// }
//
// .topHomeTooltip:hover .topHomeTooltipborder {
// visibility: visible;
//   transition-delay: 0.9s;
// }
// .topHomeTooltip:hover .topHomeBelowTooltipborder {
// visibility: visible;
//   transition-delay: 0.9s;
// }
// .topHomeTooltip:hover .topHomeTooltiptext {
//   visibility: visible;
//   transition-delay: 0.9s;
// }
// .topHomeTooltiptext:hover  {
//   visibility: visible;
//   transition-delay: 0s;
// }
// .topHomeTooltiptext:hover .topHomeTooltipborder  {
//   visibility: visible;
//   transition-delay: 0s;
// }
// .topHomeTooltiptext:hover .topHomeBelowTooltipborder  {
//   visibility: visible;
//   transition-delay: 0s;
// }
// .topHomeTooltiptext:hover .hoverAuthorName {
// border: 1px solid #ffffff;
// /* padding-bottom:5px; */
// }
// /* ---------------- */
// .hoverAuthorName:hover {
// border-bottom: 1px solid #48b37c;
// /* padding-bottom:5px; */
// }
// .hoverAuthorName2:hover {
// border-bottom: 1px solid #48b37c;
// }
// .authorProfileButton {
//   margin-top:1px;
//   float:right;
//   font-size:0.8em;
//   margin-right:13px;
//   height:29px; /* 25px */
//   width:85px;
//   border: 1.25px solid #15a05c;		/*#1e8971; */
//   border-radius:5px;
//   font-weight:400;
//   color:#15a05c;
//   text-align:center;
//   letter-spacing:0.045em; /* 0.035em */
//   cursor:pointer;
// }
// .viewProfileText {
//  margin-top:3.5px;
// }
// .joinedDateLower {
// margin-top:6.2px;
// color:#878787;
// font-size:0.85em;
// margin-left:14px;
// float:left;
// font-weight:400;
// letter-spacing:0.045em;
// }
// .toolTipLowerHr {
// height:2.25px;
// margin-left:15px;
// margin-right:30px;
// background-color:#e1e1e1;
// color:#e1e1e1;
// width:250px;
// border:none;
// margin-bottom:9px;
// margin-top:8px;
// }
// .toolTipHigherHr {
// height:2.25px;
// margin-left:15px;
// margin-right:14px;
// background-color:#e1e1e1;
// color:#e1e1e1;
// margin-top:17px;
// width:250px;
// border:none;
// margin-bottom:11px;
// }
// .toolTipAboveLowerHrSpacing {
// margin-bottom:8px;
// height:25px;
// }
// .toolTipPopularStoriesN {
// float:left;
// font-size:11.5px;
// /* margin-bottom:5px; */
// }
// .ttPolarStoriesN1 {
//   margin-top:-1px;
//   margin-right:5px;
// }
// .ttPolarStoriesN2 {
//   margin-right:5px;
// }
// .ttPolarStoriesN3 {
// margin-right:5px;
// }
// .toolTipPopularStories {
//     float:left;
//   font-weight:450; /* 300 (recent) */
//   font-size:11.4px;
//   cursor:pointer;
//   color:#000;
// }
// .toolTipPopularStories:hover {
// color:#15a05c;
// }
// .ttPolarStories1 {
//  margin-top:-1px;
// }
// .popularArticlesList {
// margin-top:5.5px;
// color:#a0a0a0;
// font-size:0.85em;
// margin-left:19px;
// line-height:1.6;
// margin-right:2%;
// margin-bottom:15px;
// }
// .toolTipPopularArticles {
// margin-left:17px;
// color:#a0a0a0;
// letter-spacing:0.003em;
// font-size:14.4px;
// }
// .toolTipAuthorImage {
// border-radius:50px;
// margin-left:208px;
// margin-top:-146px;
// float:left;
// cursor:pointer;
// }
// .toolTipAboutTheAuthor {
// margin-top:6.5px;
// margin-left:17px;
// margin-right:30.5%;
// font-size:11.7px;
// color:#878787;
// font-weight:300;
// margin-bottom:12px;
// line-height:1.75;
// letter-spacing:0.035em;
// word-spacing:0.006em;
// }
// hoverOverToolTipMainAuthor:hover {
//   color:#48b37c;
// }
// hoverOverToolTipMainAuthor {
// cursor:pointer;
// }
// .toolTipMainAuthorName {
// margin-left:16.5px;
// margin-top:13px;
// font-size:16.95px;
// font-weight:600;
// letter-spacing:0.045em;
// height:19px;
// display:block;
// color:#000;
// }
// .hoverAuthorName {
// height:19px;
// margin-top:-18.3px;
// cursor:pointer;
// display:block;
// }
// .hoverAuthorName2 {
// height:20px;
// margin-top:-18.3px;
// cursor:pointer;
// display:block;
// }
// .popularArticleCategories:hover {
// color:#000000;
// }
// .popArtTitleHover:hover {
// color:#15a05c;
// }
// .popUpAuthor {
//   margin-left:50.5px;
//   font-size:1.04em;
//   font-weight:450;
//   letter-spacing:0.045em;
//   height:3px;
//   margin-top:-17px;
//   margin-bottom:12px;
//   float:left;
// }
// .popUpAuthorArticle1 {
// margin-top:-26.8px;
// margin-bottom:-12px;
// padding-bottom:-12px;
// }
// .popMainArticleImage1 {
// border-radius:50px;
// margin-left:300px;
// margin-top:2.5px;
// float:left;
// cursor:pointer;
// }
// #positionBookArticle1 {
// margin-right:4.5px;
// margin-top:29px;
// margin-left:9px;
// color:#c3c3c3;
// width:10.7px;
// height:12.8px;
// }
//
//   footer {
//     margin: 20px -20px -20px;
//     border-top: 1px solid ${darken(0.1, '#4285F4')};
//     padding: 20px;
//
//
//   @media screen and (min-width: 768px) {
//     padding: 30px;
//
//     footer {
//       margin: 30px -30px -30px;
//     }
//   }
//
//   @media screen and (min-width: 992px) {
//     padding: 40px;
//
//     footer {
//       margin: 40px -40px -40px;
//     }
//   }
//
// #authorNameTooltipTop {
// margin-top:-58px;
// margin-bottom:30px;
// font-weight:500;
// font-size:0.705em;
//
// }
// #marginRightTooltips {
// margin-right:3px;
// }
//
// #marginRight5 {
//   margin-left:5px;
//   float:left;
// }
// #marginRight15 {
// margin-right:15px;
// }
// .titleAuthorHovContainer {
// font-size:4.5em;
// }
// #fontThirdArticleTooltip {
// font-size:0.5em;
// }
//
// .middleSectionTopTitle1 {
// margin-top:16px;
// }
//
// .middleTooltipSpacing {
// margin-bottom:5px; clear:both;
// }
//
// .middleSpacingTooltips {
// margin-bottom:5px; clear:both;
// }
//
// .toolTipLowerHr {
// height:2px;
// }
// .joinedDateLower {
// font-size:0.73em;
// }
// .viewProfileText {
// font-size:0.85em;
// }
// .marginRight3 {
// margin-right:3px;
// }
// .topSecondArticlePhoto {
// position:static;
// margin-left:-50px;
// }
// #positioningMiddleAuthorName1 {
// margin-top:40px;
// }
// `;
//
// const Index = () => (
// <StyledIndex>
//     <div className="leftSideHomeTop">
// <a className="featuredTop">
// <hr className="colorFeaturedHr"/>
// <div className="featuredTopText">
//   Featured
//   </div>
//   </a>
// <a>
// <div className="topFeaturedHome greenHov topSectionFirstArticleTitle">
// Cape Town&apos;s Recent Water Shortage And What This Means For The Rest of T...
// </div>
// </a>
// <div className="topHomeTooltip">
//     <div className="topHomeTooltip popUpAuthor">
//          <div id="largerAuthorDiv">
//      <div className="titleAuthorHovContainer">
//      <div className="hoverAuthorName topFirstArticleAuthorName hovTopFeaturedAuthorName" id="authorNameTooltipTop">
//                   James Carlson
//             </div>
//             </div>
//                        </div>
//                    <span className="topHomeTooltipborder"></span>
//                    <span className="topHomeBelowTooltipborder"></span>
//                    <span className="topHomeTooltiptext">
//                      <a className="toolTipMainAuthorName titleContainerAuthorName topFirstArticleAuthorName">
//                        <hoverOverToolTipMainAuthor>
//                        James Carlson
//                        </hoverOverToolTipMainAuthor>
//                      </a>
//                        <div className="aboutTextFont toolTipAboutTheAuthor topFirstArticleTooltipDes">
//                      James Carlson is a journalist from the New York Times as well as a writer for GreenCity
//                          <br /> Founder of Essex EV Group
//                          <br />
//                          www.facebook.com/greencity
//                      </div>
//
//            ${'' /* <img src="https://static1.squarespace.com/static/59fb854ccd39c36469316a33/t/5a96fca2419202a20938ba75/1519844519817/sef1.png" width="58" height="58" className="toolTipAuthorImage topFirstArticleTooltipAuthorPhoto" /> */}
//
//            <hr className="toolTipHigherHr" />
//
//                      <div className="toolTipPopularArticles">
//                        Popular Articles
//                      </div>
//                      <div className="popularArticlesList">
//
//            <div className="toolTipPopularStoriesN ttPolarStoriesN1">1. </div><a className="toolTipPopularStories ttPolarStories1 topFirstArticleTooltipPopS1">The Carbon Footprint of Water </a>
//
//                        <div className="tooltipStoriesSpacing">
//                        </div>
//
//            <div className="toolTipPopularStoriesN ttPolarStoriesN3"> 2. </div><a className="toolTipPopularStories topFirstArticleTooltipPopS2">Why Wind Power Will Dominate <div id="marginRight15"></div> The Future Energy Grid </a>
//                         <div className="tooltipStoriesSpacing">
//                        </div>
//
//            <div className="toolTipPopularStoriesN" className="ttPolarStoriesN3" id="fontThirdArticleTooltip"> 3. </div><a className="toolTipPopularStories topFirstArticleTooltipPopS3" id="marginRight5">Will Climate Change Cause More <div id="marginRightTooltips"></div>Frequent Floods or Droughts? </a>
//
//                      </div>
//
//                       <div className="toolTipAboveLowerHrSpacing"></div>
//
//            <hr className="toolTipLowerHr" />
//
//            <div className="joinedDateLower topFirstArticleTooltipAuthorJoinDate">
//             Joined May 4th 2018
//                      </div>
//              <a className="authorProfileButton topFirstArticleTooltipViewProfileLink">
//                <div className="viewProfileText">
//                    View Profile</div>
//                      </a>
//                    </span>
//               </div>
//
//               <img src="https://static1.squarespace.com/static/59fb854ccd39c36469316a33/t/5af6bff3aa4a99c18c8500a2/1526120438950/Pacific-Ocean.jpg" width="355px" height="252px" href="" className="topFirstArticlePhoto" />
//
//               </div>
//            </div>
//
//
//
//
//
//
//            <div className="middleSideHomeTop">
//  <a className="middleSectionTopTitle1 greenHov topSecondArticleTitle">
//  Cape Town&apos;s Recent Water Shortage And What This Means For This
//  </a>
//  <div className="topHomeTooltip">
//       <div className="topHomeTooltip popUpAuthor">
//            <div id="largerAuthorDiv">
//  			<div className="titleAuthorHovContainer" id="positioningMiddleAuthorName1">
//      		<div className="hovTopMiddle1AuthorName hoverAuthorName topSecondArticleAuthorName" id="middleTooltipStyle1">
//               James Carlson
//     			</div>
//    				</div>
//               </div>
//           <span className="topHomeTooltipborder"></span>
//           <span className="topHomeBelowTooltipborder"></span>
//           <span className="topHomeTooltiptext">
//             <a className="toolTipMainAuthorName topSecondArticleAuthorName">
//               <hoverOverToolTipMainAuthor>
//               James Carlson
//               </hoverOverToolTipMainAuthor>
//             </a>
//               <div className="aboutTextFont toolTipAboutTheAuthor topSecondArticleTooltipDes">
//             James Carlson is a journalist from the New York Times as well as a writer for GreenCity
//                 <br /> Founder of Essex EV Group
//                 <br />
//                 www.facebook.com/greencity
//             </div>
//  <img src="https://static1.squarespace.com/static/59fb854ccd39c36469316a33/t/5a96fca2419202a20938ba75/1519844519817/sef1.png" width="58"
//    height="58" className="toolTipAuthorImage topSecondArticleTooltipAuthorPhoto" />
//
//  <hr className="toolTipHigherHr" />
//
//             <div className="toolTipPopularArticles">
//               Popular Articles
//             </div>
//             <div className="popularArticlesList">
//
//  <div className="toolTipPopularStoriesN ttPolarStoriesN1">1. </div><a className="toolTipPopularStories ttPolarStories1 topSecondArticleTooltipPopS1">The Carbon Footprint of Water </a>
//
//               <div className="middleTooltipSpacing">
//               </div>
//
//  <div className="toolTipPopularStoriesN ttPolarStoriesN3"> 2. </div><a className="toolTipPopularStories topSecondArticleTooltipPopS2">Why Wind Power Will Dominate <div className="marginRight15"></div> The Future Energy Grid </a>
//                <div>
//               </div>
//
//  <div className="toolTipPopularStoriesN" className="ttPolarStoriesN3"> 3. </div><a className="toolTipPopularStories topSecondArticleTooltipPopS3" className="marginRight15">Will Climate Change Cause More <div className="marginRight3"></div>Frequent Floods or Droughts? </a>
//
//             </div>
//
//              <div className="toolTipAboveLowerHrSpacing"></div>
//
//  <hr className="toolTipLowerHr" />
//
//  <div className="joinedDateLower topSecondArticleTooltipAuthorJoinDate">
//    Joined May 4th 2018
//             </div>
//     <a className="authorProfileButton topSecondArticleTooltipViewProfileLink">
//       <div className="viewProfileText">
//           View Profile</div>
//             </a>
//           </span>
// </div>
//
// <div className="middleSubArticle">
//   <div className="titleArticleMainDateAndTime topSecondArticleDateAndRead"> 24 Mar 2018 · 8 min read</div>
//  </div>
//
//  <img src="https://static1.squarespace.com/static/59fb854ccd39c36469316a33/t/5af6bff3aa4a99c18c8500a2/1526120438950/Pacific-Ocean.jpg" width="129px" height="118px" href="" className="topSecondArticlePhoto" />
//
// </div></div>
//
//   </StyledIndex>
//   // <StyledIndex>
//   //   <img
//   //     src="https://s3-us-west-2.amazonaws.com/cleverbeagle-assets/graphics/email-icon.png"
//   //     alt="Clever Beagle"
//   //   />
//   //   <h1>Pup</h1>
//   //   <p>A boilerplate for products.</p>
//   //   <div>
//   //     <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
//   //     <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
//   //   </div>
//   //   <footer>
//   //     <p>Want to ensure that your product sees the light of day? <a href="https://cleverbeagle.com?utm_source=pup&utm_medium=app&utm_campaign=oss">Work with Clever Beagle</a>.</p>
//   //   </footer>
//   // </StyledIndex>
// );
//
// export default Index;
