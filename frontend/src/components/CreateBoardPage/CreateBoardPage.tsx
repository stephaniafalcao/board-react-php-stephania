import './create-board-page.css';
import { Link } from "react-router-dom";
import { TitleForm } from '../TitleForm/TitleForm';
import { FormNewBoard } from '../FormNewBoard/FormNewBoard';
import { Page } from '../Page/Page';

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

          <TitleForm>Create New Board</TitleForm>

          <p>
            Design a new space for your team's workflow and performance tracking.
          </p>
        </section>

        <section className="create-board-panel">
          <FormNewBoard />
        </section>
    </Page>
  );
}
