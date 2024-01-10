import useDocumentTitle from '../../utils/hooks/seo';

export default function NotFound () {
  useDocumentTitle('Not Found Page');
  
  return (
      <div className="not-found">
        <h1>404 Page not found</h1>
      </div>
  );
}