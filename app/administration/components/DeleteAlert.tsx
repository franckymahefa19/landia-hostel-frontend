import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteAlert({open, onOpenChange, onActive}:{open: boolean, onOpenChange: (open: boolean)=>void, onActive: ()=>void}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>En êtes-vous sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
          onClick={onActive}
           className="bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive hover:text-primary-foreground">Continuer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
