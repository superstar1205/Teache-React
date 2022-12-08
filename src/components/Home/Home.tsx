import React, { Fragment, Dispatch } from "react";
import { useDispatch} from "react-redux";
import TopCard from "../../common/components/TopCard";
import { updateCurrentPath } from "../../store/actions/root.actions";
const Home: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("home", ""));

  return (
    <Fragment>
            <div className="row">
        <div className="col-xl-12 col-lg-12">
        <div className="card mb-4" style={{border: 'none'}}>
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold" style={{fontSize:'20px', color:'#5a67de' }}>
                Dashboard
              </h6>
              <div className="header-buttons"></div>
            </div>
            </div>
            </div>
            </div>
  
      <div className="row">
        <TopCard  link="/teacher"  title="TEACHER" text='2' icon="user-tie" class="primary"/>
        <TopCard  link="/users" title="USER" text='2' icon="user" class="danger" />
      </div>

    </Fragment>
  );
};

export default Home;
