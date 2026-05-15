import './create-board-page.css';
import { Link } from "react-router-dom";
import { FormNewBoard } from '../FormNewBoard/FormNewBoard';
import { Page } from '../Page/Page';
import { Header } from '../Header/Header';

export function CreateBoardPage() {
  return (
    <Page>
        <section className="create-board-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Workspace
            </Link>
            <span className="breadcrumb-separator" aria-hidden="true">&gt;</span>
            <Link to="/boards" className="breadcrumb-link">
              Boards
            </Link>
          </nav>
          <Header
              title="Create New Board"
              description="Design a new space for your team's workflow and performance tracking."
          /> 
        </section>

        <section className="create-board-panel">
          <FormNewBoard />
        </section>
    </Page>
  );
}
