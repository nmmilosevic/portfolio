import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main id="content" className="inset flex min-h-[80vh] flex-col justify-center">
      <h1 className="t-title mb-8">This page doesn’t exist</h1>
      <div>
        <Button href="/" variant="secondary">
          Back to the work
        </Button>
      </div>
    </main>
  );
}
