class Node{
    constructor(value = null){
      this.value = value
      this.next = null
    }
  }
  
  class LinkedList{
    constructor(){
      this.head = null
    }
    appendToTail(value){
      if(!this.head){
        this.head = new Node(value)
        return
      }
      let current = this.head
      while(current.next != null){
        current = current.next
      }
      current.next = new Node(value)
    }
    deleteNode(value){
      if(!this.head)return
      let current = this.head
      
      if(current.value == value){
        // this.head = current.next
        this.head = current.next
        return
      }
      
      while(current.next != null){
        console.log(current)
        if(current.next.value == value){
          current.next = current.next.next
          return
        }else {
            current = current.next
            // current = current.next.value
        }

      }
    }
  }
  
  const list = new LinkedList()
  list.appendToTail(5)
  list.appendToTail(6)
  list.appendToTail(7)
  list.appendToTail(8)
//   list.deleteNode(5)
  list.deleteNode(8)
  
  
  
  console.log(JSON.stringify(list))

