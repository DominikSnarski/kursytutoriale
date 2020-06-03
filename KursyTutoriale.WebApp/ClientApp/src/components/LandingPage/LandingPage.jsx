import { useHistory } from 'react-router-dom';
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CoursesList from './CoursesList';
import Featured from './Featured';
import './LandingPage.css';
import CourseSearchbar from '../Courses/Search/CourseSearchbar';

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="page">
      <OwlCarousel items={1} loop autoplay margin={0} className="section">
        <div className="slide">
          <div
            className="slide_background"
            style={{
              backgroundImage:
                'url(https://libreshot.com/wp-content/uploads/2016/07/red-background-book.jpg)',
            }}
          ></div>
          <div className="slide_container d-flex flex-column align-items-center justify-content-center">
            <div className="slide_content text-center">
              <h1>
                Get the best <span>Courses</span> today!
              </h1>
            </div>
          </div>
        </div>

        <div className="slide">
          <div
            className="slide_background"
            style={{
              backgroundImage:
                'url(https://upload.wikimedia.org/wikipedia/commons/e/e1/Duke_Humfrey%27s_Library_Interior_6%2C_Bodleian_Library%2C_Oxford%2C_UK_-_Diliff.jpg)',
            }}
          ></div>
          <div className="slide_container d-flex flex-column align-items-center justify-content-center">
            <div className="slide_content text-center">
              <h1>
                Get the cheapest <span>Tutorials</span> today!
              </h1>
            </div>
          </div>
        </div>
      </OwlCarousel>

      <div className="page_section section">
        <div>
          <div className="row">
            <div className="col">
              <div className="section_title text-center">
                <h1>Featured Courses</h1>
              </div>
            </div>
          </div>
          <Featured />
        </div>
      </div>

      <div className="page_section section_second section">
        <div>
          <div className="row">
            <div className="col">
              <div className="section_title title_second text-center">
                <h1>Course List</h1>
              </div>
            </div>
          </div>
          <CoursesList />
        </div>
      </div>

      <div className="page_section section">
        <div>
          <div className="row">
            <div className="col">
              <div className="section_title text-center">
                <h1>Search for courses</h1>
              </div>
            </div>
          </div>
          <CourseSearchbar
            onSubmit={(query) => {
              history.push(`search?query=${query}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
