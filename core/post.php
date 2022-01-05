<?php
class Post
{
    //db link
    private $conn;
    private $calendar_table          = 'calendar';
    private $events_table            = 'events';
    private $gallery_table           = 'gallery';
    private $menu_table              = 'menu';
    private $menutype_table          = 'menutype';
    private $news_table              = 'news';
    private $page_table              = 'page';
    private $pagetemplate_table      = 'pagetemplate';
    private $section_table           = 'section';
    private $sectiontemplate_table   = 'sectiontemplate';
    private $slider_table            = 'slider';
    private $slidertemplate_table    = 'slidertemplate';
    private $video_table             = 'videos';
    private $userlogin_table         = 'userlogin';
    //private $location = "../upload/" . $filename;
    //private $imageFileType = pathinfo($location, PATHINFO_EXTENSION);
   // private $imageFileType = strtolower($imageFileType);

   
    //post properties
    public $filename;
    public $file;
    public $size;
    public $id;
    public $calendardate;
    public $details;
    public $created;
    public $eventdate;
    public $title;
    public $description;
    public $link;
    public $status;
    public $image;
    public $menutype;
    public $content;
    public $pagetemplate;
    public $pageid;
    public $sectiontemplate;
    public $slidertemplate;
    public $position;
    public $template;
    public $video;
    public $history;
    public $first_name;
    public $last_name;
    public $username;
    public $email;
    public $category;

    //constructor with db connection
    public function __construct($db)
    {
        $this->conn=$db;
    }

/******** **** **** **** **** ************ **** **** **** **** ****   upload image  ******** **** **** **** **** ******** **** **** **** **** ********/
public function upload(){
    //$this->filename = $_FILES['file']['name'];
   //$this->size = $_FILES['file']['size'];
 
    /* Location */
    $this->location = "../upload/" . $this->filename;
    $this->imageFileType = pathinfo($this->location, PATHINFO_EXTENSION);
    $this->imageFileType = strtolower($this->imageFileType);

    //$this->file = $_FILES['file']['tmp_name'];
    
  
    /* Valid extensions */
    //$valid_extensions = array("jpg","jpeg","png");
  
    //$response = 0;
    /* Check file extension */
    //if(in_array(strtolower($imageFileType), $valid_extensions)) {
        
       /* Upload file */
        if (move_uploaded_file($this->file, $this->location)) {
            return true;
        }
        //printf("Error %s. \n", $stmt->error);
        return false;
}
/******** **** **** **** **** ************ **** **** **** **** ****   calendar  ******** **** **** **** **** ******** **** **** **** **** ********/
    /*** create calendar ***/
    public function calendar(){
                  
         //create query
         $query = 'INSERT INTO '. $this->calendar_table . " SET 
         calendardate =  :calendardate,
         details      =  :details";
         //prepare statement
         $stmt = $this->conn->prepare($query);

         //clean data
         $this->calendardate = htmlspecialchars(strip_tags($this->calendardate));
         $this->details      = htmlspecialchars(strip_tags($this->details));

         //binding param
         $stmt->bindParam(':calendardate', $this->calendardate);
         $stmt->bindParam(':details', $this->details);
         //execute
         if($stmt->execute()){
            return true; 
        }
        //error
        printf("Error %s. \n", $stmt->error);
        return false;
    }

/*** read calendar ***/
    public function read_calendar(){
        //create query
        $query = 'SELECT
        c.id,
        c.calendardate,
        c.details,
        c.created
        FROM '.$this->calendar_table.' c
        ORDER BY c.created DESC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }

    /*** read all calendar ***/
    public function read_allcalendar(){
        //create query
        $query = 'SELECT
        c.id,
        c.calendardate,
        c.details
        FROM '.$this->calendar_table.' c
        ORDER BY c.created DESC';

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //execute query
    $stmt->execute();
    return $stmt; 
    }

     /*** read single calendar ***/
     public function read_singlecalender(){
        $query= 'SELECT
        id,
        calendardate,
        details
        FROM '.$this->calendar_table.' 
        WHERE id = ? LIMIT 1';
        

        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(1, $this->id);
        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id             = $row['id'];
        $this->calendardate   = $row['calendardate'];
        $this->details        = $row['details'];
        
        }

    /*** update calendar ***/
    public function update_calendar(){
                  
        //create query
        $query = 'UPDATE '. $this->calendar_table . " SET 
        calendardate =  :calendardate,
        details      =  :details
        WHERE id     =  :id";
        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->calendardate = htmlspecialchars(strip_tags($this->calendardate));
        $this->details      = htmlspecialchars(strip_tags($this->details));
        $this->id      = htmlspecialchars(strip_tags($this->id));

        //binding param
        $stmt->bindParam(':calendardate', $this->calendardate);
        $stmt->bindParam(':details', $this->details);
        $stmt->bindParam(':id', $this->id);
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

   /*** delete calendar ***/
   public function delete_calendar(){
                  
    //create query
    $query = 'DELETE FROM '. $this->calendar_table . " WHERE id = :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->id      = htmlspecialchars(strip_tags($this->id));

    //binding param
    $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   events  ******** **** **** **** **** ******** **** **** **** **** ********/
    /****   create events  ****/
    public function events(){
               
        //create query
        $query = 'INSERT INTO '. $this->events_table. ' SET
        eventdate   = :eventdate,
        title       = :title,
        description = :description,
        link        = :link,
        status      = :status';
        //prepare statement
        $stmt = $this->conn->prepare($query);

         //clean data
         $this->eventdate    = htmlspecialchars(strip_tags($this->eventdate));
         $this->title        = htmlspecialchars(strip_tags($this->title));
         $this->description  = htmlspecialchars(strip_tags($this->description));
         $this->link         = htmlspecialchars(strip_tags($this->link));
         $this->status       = htmlspecialchars(strip_tags($this->status));

        //binding param
        $stmt->bindParam(':eventdate', $this->eventdate);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':link', $this->link);
        $stmt->bindParam(':status', $this->status);
        //execute
        if($stmt->execute()){
           return true; 
       }
       //error
       printf("Error %s. \n", $stmt->error);
       return false;
   }

/*** read events ***/
public function read_events(){
    //create query
    $query = 'SELECT
    e.id,
    e.eventdate,
    e.title,
    e.description,
    e.link,
    e.status,
    e.created
    FROM '.$this->events_table.' e
    ORDER BY e.created DESC';
    //$this->conn->quote($this->event_table);
//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all events ***/
public function read_allevents(){
    //create query
    $query = 'SELECT
    e.id,
    e.eventdate,
    e.title,
    e.description,
    e.link,
    e.status
    
    FROM '.$this->events_table.' e
    ORDER BY e.created DESC';
    //$this->conn->quote($this->event_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single event ***/
 public function read_singleevent(){
    $query= 'SELECT
     id,
     eventdate,
     title,
     description,
     link,
     status
    FROM '.$this->events_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->event_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id           = $row['id'];
    $this->eventdate    = $row['eventdate'];
    $this->title        = $row['title'];
    $this->description  = $row['description'];
    $this->link         = $row['link'];
    $this->status       = $row['status'];
    
    }

/*** update events ***/
public function update_event(){
              
    //create query
    $query = 'UPDATE '. $this->events_table . " SET 
    eventdate   =  :eventdate,
    title       =  :title,
    description =  :description,
    link        =  :link,
    status      =  :status
    WHERE id    =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->eventdate    = htmlspecialchars(strip_tags($this->eventdate));
    $this->title        = htmlspecialchars(strip_tags($this->title));
    $this->description  = htmlspecialchars(strip_tags($this->description));
    $this->link         = htmlspecialchars(strip_tags($this->link));
    $this->status       = htmlspecialchars(strip_tags($this->status));
    $this->id           = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':eventdate', $this->eventdate);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':description', $this->description);
   $stmt->bindParam(':link', $this->link);
   $stmt->bindParam(':status', $this->status);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete event ***/
public function delete_event(){
              
//create query
$query = 'DELETE FROM '. $this->events_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   gallery  ******** **** **** **** **** ******** **** **** **** **** ********/
   /****   create gallery  ****/
   public function gallery(){
    //clean data
    $this->image = htmlspecialchars(strip_tags($this->image));
    $this->title = htmlspecialchars(strip_tags($this->title));
    
    //create query
    $query = 'INSERT INTO '. $this->gallery_table.' SET
    image = :image,
    title = :title';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':image', $this->image);
    $stmt->bindParam(':title', $this->title);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read gallery ***/
public function read_gallery(){
    //create query
    $query = 'SELECT
    g.id,
    g.image,
    g.title,
    g.created
    
    FROM '.$this->gallery_table.' g
    ORDER BY g.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all gallery ***/
public function read_allgallery(){
    //create query
    $query = 'SELECT
    g.id,
    g.image,
    g.title
   
    
    FROM '.$this->gallery_table.' g
    ORDER BY g.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single gallery ***/
 public function read_singlegallery(){
    $query= 'SELECT
     id,
     image,
     title    
     
    FROM '.$this->gallery_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id     = $row['id'];
    $this->image  = $row['image'];
    $this->title  = $row['title'];
    
       
    }

/*** update gallery ***/
public function update_gallery(){
              
    //create query
    $query = 'UPDATE '. $this->gallery_table . " SET 
    
    title       =  :title
    WHERE id    =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
   // $this->image        = htmlspecialchars(strip_tags($this->image));
    $this->title        = htmlspecialchars(strip_tags($this->title));
    $this->id           = htmlspecialchars(strip_tags($this->id));

   //binding param
  // $stmt->bindParam(':image', $this->image);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** update gallery image ***/
public function update_galleryimage(){
              
    //create query
    $query = 'UPDATE '. $this->gallery_table . " SET 
    
    
    image           =  :image
    
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    
    $this->image               = htmlspecialchars(strip_tags($this->image));
    
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':image', $this->image);
   
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete gallery ***/
public function delete_gallery(){
              
//create query
$query = 'DELETE FROM '. $this->gallery_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   menu  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   reat menu  ****/
public function menu(){
    //clean data
    $this->title        = htmlspecialchars(strip_tags($this->title));
    $this->menutype     = htmlspecialchars(strip_tags($this->menutype));
    $this->link         = htmlspecialchars(strip_tags($this->link));
    $this->status       = htmlspecialchars(strip_tags($this->status));
    
    //create query
    $query = 'INSERT INTO '.$this->menu_table.' SET
    title       = :title,
    menutype    = :menutype,
    link        = :link,
    status      = :status';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':menutype', $this->menutype);
    $stmt->bindParam(':link', $this->link);
    $stmt->bindParam(':status', $this->status);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read menu ***/
public function read_menu(){
    //create query
    $query = 'SELECT
    m.id,
    m.title,
    m.menutype,
    m.link,
    m.status,
    m.created
    
    FROM '.$this->menu_table.' m
    ORDER BY m.created DESC';
    //$this->conn->quote($this->menu_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all menu ***/
public function read_allmenu(){
    //create query
    $query = 'SELECT
    m.id,
    m.title,
    m.menutype,
    m.link,
    m.status
   
    FROM '.$this->menu_table.' m
    ORDER BY m.created DESC';
    //$this->conn->quote($this->menu_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single menu ***/
 public function read_singlemenu(){
    $query= 'SELECT
    id,
    title,
    menutype,
    link,
    status  
     
    FROM '.$this->menu_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->menu_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id       = $row['id'];
    $this->title    = $row['title'];
    $this->menutype  = $row['menutype'];
    $this->link     = $row['link'];
    $this->status   = $row['status'];
    
       
    }

/*** update menu ***/
public function update_menu(){
              
    //create query
    $query = 'UPDATE '. $this->menu_table . " SET 
    
    title      =  :title,
    menutype   =  :menutype,
    link       =  :link,
    status     =  :status
    WHERE id   =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    $this->title       = htmlspecialchars(strip_tags($this->title));
    $this->menutype    = htmlspecialchars(strip_tags($this->menutype));
    $this->link        = htmlspecialchars(strip_tags($this->link));
    $this->status      = htmlspecialchars(strip_tags($this->status));
    $this->id          = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':menutype', $this->menutype);
   $stmt->bindParam(':link', $this->link);
   $stmt->bindParam(':status', $this->status);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete menu ***/
public function delete_menu(){
              
//create query
$query = 'DELETE FROM '. $this->menu_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}

/******** **** **** **** **** ************ **** **** **** **** ****   menutype  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****  creat menutype  ****/
public function menutype(){
    //clean data
    $this->menutype = htmlspecialchars(strip_tags($this->menutype));
   
    
    //create query
    $query = 'INSERT INTO '.$this->menutype_table.' SET
    menutype = :menutype';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':menutype', $this->menutype);
    
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


/*** read menutype ***/
public function read_menutype(){
    //create query
    $query = 'SELECT
    m.id,
    m.menutype
    
    FROM '.$this->menutype_table.' m
    ORDER BY m.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all menutype ***/
public function read_allmenutype(){
    //create query
    $query = 'SELECT
    m.id,
    m.menutype
   
    FROM '.$this->menutype_table.' m
    ORDER BY m.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single menutype ***/
 public function read_singlemenutype(){
    $query= 'SELECT
    id,
    menutype
     
    FROM '.$this->menutype_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id       = $row['id'];
    $this->menutype  = $row['menutype'];
    }

/*** update menutype ***/
public function update_menutype(){
              
    //create query
    $query = 'UPDATE '. $this->menutype_table . " SET 
    
    menutype   =  :menutype
    WHERE id   =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->menutype    = htmlspecialchars(strip_tags($this->menutype));
    $this->id          = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':menutype', $this->menutype);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete menutype ***/
public function delete_menutype(){
              
//create query
$query = 'DELETE FROM '. $this->menutype_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}


/******** **** **** **** **** ************ **** **** **** **** ****   news  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   create news  ****/
public function news(){
    //clean data
    $this->image    = htmlspecialchars(strip_tags($this->image));
    $this->title    = htmlspecialchars(strip_tags($this->title));
    $this->content  = htmlspecialchars(strip_tags($this->content));
    $this->link     = htmlspecialchars(strip_tags($this->link));
    $this->status   = htmlspecialchars(strip_tags($this->status));
    
    //create query
    $query = 'INSERT INTO '.$this->news_table.' SET
    image      = :image,
    title      = :title,
    content    = :content,
    link       = :link,
    status     = :status';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':image', $this->image);
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':content', $this->content);
    $stmt->bindParam(':link', $this->link);
    $stmt->bindParam(':status', $this->status);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


/*** read news ***/
public function read_news(){
    //create query
    $query = 'SELECT
    n.id,
    n.image,
    n.title,
    n.content,
    n.link,
    n.status,
    n.created
    
    FROM '.$this->news_table.' n
    ORDER BY n.created DESC';
    //$this->conn->quote($this->news_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all news ***/
public function read_allnews(){
    //create query
    $query = 'SELECT
    n.id,
    n.image,
    n.title,
    n.content,
    n.link,
    n.status

   
    FROM '.$this->news_table.' n
    ORDER BY n.created DESC';
   // $this->conn->quote($this->news_table);

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single news ***/
 public function read_singlenews(){
    $query= 'SELECT
    id,
    image,
    title,
    content,
    link,
    status
     
    FROM '.$this->news_table.' 
    WHERE id = ? LIMIT 1';
    
   // $this->conn->quote($this->news_table);

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id       = $row['id'];
    $this->image    = $row['image'];
    $this->title    = $row['title'];
    $this->content  = $row['content'];
    $this->link     = $row['link'];
    $this->status   = $row['status'];
    }

/*** update news ***/
public function update_news(){
              
    //create query
    $query = 'UPDATE '. $this->news_table . " SET 
    
    
    title      =  :title,
    content    =  :content,
    link       =  :link,
    status     =  :status
    WHERE id   =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    //$this->image    = htmlspecialchars(strip_tags($this->image));
    $this->title    = htmlspecialchars(strip_tags($this->title));
    $this->content  = htmlspecialchars(strip_tags($this->content));
    $this->link     = htmlspecialchars(strip_tags($this->link));
    $this->status   = htmlspecialchars(strip_tags($this->status));
    $this->id       = htmlspecialchars(strip_tags($this->id));

   //binding param
  // $stmt->bindParam(':image', $this->image);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':content', $this->content);
   $stmt->bindParam(':link', $this->link);
   $stmt->bindParam(':status', $this->status);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** update news image ***/
public function update_newsimage(){
              
    //create query
    $query = 'UPDATE '. $this->news_table . " SET 
    
    
    image           =  :image
    
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    
    $this->image               = htmlspecialchars(strip_tags($this->image));
    
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':image', $this->image);
   
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


/*** delete news ***/
public function delete_news(){
              
//create query
$query = 'DELETE FROM '. $this->news_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}


/******** **** **** **** **** ************ **** **** **** **** ****   page  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   page  ****/
public function page(){
    //clean data
    $this->user         = htmlspecialchars(strip_tags($this->user));
    $this->pagetemplate = htmlspecialchars(strip_tags($this->pagetemplate));
    $this->title        = htmlspecialchars(strip_tags($this->title));
    
    //create query
    $query = 'INSERT INTO '.$this->page_table.' SET
    user          = :user,
    pagetemplate  = :pagetemplate,
    title         = :title';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':user', $this->user);
    $stmt->bindParam(':pagetemplate', $this->pagetemplate);
    $stmt->bindParam(':title', $this->title);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


/*** read page ***/
public function read_page(){
    //create query
    $query = 'SELECT
    p.id,
    p.user,
    p.pagetemplate,
    p.title,
    p.created
    
    FROM '.$this->page_table.' p
    ORDER BY p.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all page ***/
public function read_allpage(){
    //create query
    $query = 'SELECT
    p.id,
    p.user,
    p.pagetemplate,
    p.title
   
    FROM '.$this->page_table.' p
    ORDER BY p.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single page ***/
 public function read_singlepage(){
    $query= 'SELECT
    id,
    user,
    pagetemplate,
    title
     
    FROM '.$this->page_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id              = $row['id'];
    $this->user            = $row['user'];
    $this->pagetemplate    = $row['pagetemplate'];
    $this->title           = $row['title'];
   
    }

/*** update page ***/
public function update_page(){
              
    //create query
    $query = 'UPDATE '. $this->page_table . " SET 
    
    user            =  :user,
    pagetemplate    =  :pagetemplate,
    title           =  :title
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->user            = htmlspecialchars(strip_tags($this->user));
    $this->pagetemplate    = htmlspecialchars(strip_tags($this->pagetemplate));
    $this->title           = htmlspecialchars(strip_tags($this->title));
    $this->id              = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':user', $this->user);
   $stmt->bindParam(':pagetemplate', $this->pagetemplate);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete page ***/
public function delete_page(){
              
//create query
$query = 'DELETE FROM '. $this->page_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}


/******** **** **** **** **** ************ **** **** **** **** ****   pagetemplate  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   pagetemplate  ****/
public function pagetemplate(){
    //clean data
    $this->pagetemplate = htmlspecialchars(strip_tags($this->pagetemplate));
    $this->description      = htmlspecialchars(strip_tags($this->description));
    
    //create query
    $query = 'INSERT INTO '.$this->pagetemplate_table.' SET
    pagetemplate = :pagetemplate,
    description  = :description';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':pagetemplate', $this->pagetemplate);
    $stmt->bindParam(':description', $this->description);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}


/*** read pagetemplate ***/
public function read_pagetemplate(){
    //create query
    $query = 'SELECT
    pt.id,
    pt.pagetemplate,
    pt.description
    
    FROM '.$this->pagetemplate_table.' pt
    ORDER BY pt.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all pagetemplate ***/
public function read_allpagetemplate(){
    //create query
    $query = 'SELECT
    pt.id,
    pt.pagetemplate,
    pt.description
   
    FROM '.$this->pagetemplate_table.' pt
    ORDER BY pt.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single pagetemplate ***/
 public function read_singlepagetemplate(){
    $query= 'SELECT
    id,
    pagetemplate,
    description
     
    FROM '.$this->pagetemplate_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id              = $row['id'];
    $this->pagetemplate    = $row['pagetemplate'];
    $this->description     = $row['description'];
   
    }

/*** update pagetemplate ***/
public function update_pagetemplate(){
              
    //create query
    $query = 'UPDATE '. $this->pagetemplate_table . " SET 
    
    pagetemplate    =  :pagetemplate,
    description     =  :description
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->pagetemplate    = htmlspecialchars(strip_tags($this->pagetemplate));
    $this->description     = htmlspecialchars(strip_tags($this->description));
    $this->id              = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':pagetemplate', $this->pagetemplate);
   $stmt->bindParam(':description', $this->description);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete pagetemplate ***/
public function delete_pagetemplate(){
              
//create query
$query = 'DELETE FROM '. $this->pagetemplate_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}



/******** **** **** **** **** ************ **** **** **** **** ****   section  ******** **** **** **** **** ******** **** **** **** **** ********/
 /****   section  ****/
public function section(){
    //clean data
    $this->pageid           = htmlspecialchars(strip_tags($this->pageid));
    $this->title            = htmlspecialchars(strip_tags($this->title));
    $this->content          = htmlspecialchars(strip_tags($this->content));
    $this->image            = htmlspecialchars(strip_tags($this->image));
    $this->sectiontemplate  = htmlspecialchars(strip_tags($this->sectiontemplate));
    
    //create query
    $query = 'INSERT INTO '.$this->section_table.' SET
    pageid           = :pageid,
    title            = :title,
    content          = :content,
    image            = :image,
    sectiontemplate  = :sectiontemplate';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':pageid', $this->pageid);
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':content', $this->content);
    $stmt->bindParam(':image', $this->image);
    $stmt->bindParam(':sectiontemplate', $this->sectiontemplate);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read section ***/
public function read_section(){
    //create query
    $query = 'SELECT
    s.id,
    s.pageid,
    s.title,
    s.content,
    s.image,
    s.sectiontemplate,
    s.created
    
    FROM '.$this->section_table.' s
    ORDER BY s.created DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all section ***/
public function read_allsection(){
    //create query
    $query = 'SELECT
    s.id,
    s.pageid,
    s.title,
    s.content,
    s.image,
    s.sectiontemplate
   
    FROM '.$this->section_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single section ***/
 public function read_singlesection(){
    $query= 'SELECT
    id,
    pageid,
    title,
    content,
    image,
    sectiontemplate
     
    FROM '.$this->section_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id               = $row['id'];
    $this->pageid           = $row['pageid'];
    $this->title            = $row['title'];
    $this->content          = $row['content'];
    $this->image            = $row['image'];
    $this->sectiontemplate  = $row['sectiontemplate'];
   
    }

/*** update section ***/
public function update_section(){
              
    //create query
    $query = 'UPDATE '. $this->section_table . " SET 
    
    pageid              =  :pageid,
    title               =  :title,
    content             =  :content,
    
    sectiontemplate     =  :sectiontemplate
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->pageid              = htmlspecialchars(strip_tags($this->pageid));
    $this->title               = htmlspecialchars(strip_tags($this->title));
    $this->content             = htmlspecialchars(strip_tags($this->content));
    //$this->image               = htmlspecialchars(strip_tags($this->image));
    $this->sectiontemplate     = htmlspecialchars(strip_tags($this->sectiontemplate));
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   $stmt->bindParam(':pageid', $this->pageid);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':content', $this->content);
   //$stmt->bindParam(':image', $this->image);
   $stmt->bindParam(':sectiontemplate', $this->sectiontemplate);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** update section image ***/
public function update_sectionimage(){
              
    //create query
    $query = 'UPDATE '. $this->section_table . " SET 
    
    
    image               =  :image
    
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    
    $this->image               = htmlspecialchars(strip_tags($this->image));
    
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':image', $this->image);
   
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete section ***/
public function delete_section(){
              
//create query
$query = 'DELETE FROM '. $this->section_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}


/******** **** **** **** **** ************ **** **** **** **** ****   sectiontemplate  ******** **** **** **** **** ******** **** **** **** **** ********/
/****   sectiontemplate  ****/
public function sectiontemplate(){
    //clean data
    $this->sectiontemplate   = htmlspecialchars(strip_tags($this->sectiontemplate));
    $this->description       = htmlspecialchars(strip_tags($this->description));
   
    
    //create query
    $query = 'INSERT INTO '.$this->sectiontemplate_table.' SET
    sectiontemplate  = :sectiontemplate,
    description      = :description';
   
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':sectiontemplate', $this->sectiontemplate);
    $stmt->bindParam(':description', $this->description);
   
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read sectiontemplate ***/
public function read_sectiontemplate(){
    //create query
    $query = 'SELECT
    s.id,
    s.sectiontemplate,
    s.description
   
    FROM '.$this->sectiontemplate_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all sectiontemplate ***/
public function read_allsectiontemplate(){
    //create query
    $query = 'SELECT
    s.id,
    s.sectiontemplate,
    s.description
   
    FROM '.$this->sectiontemplate_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single sectiontemplate ***/
 public function read_singlesectiontemplate(){
    $query= 'SELECT
    id,
    sectiontemplate,
    description
     
    FROM '.$this->sectiontemplate_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id               = $row['id'];
    $this->sectiontemplate  = $row['sectiontemplate'];
    $this->description      = $row['description'];

   
    }

/*** update sectiontemplate ***/
public function update_sectiontemplate(){
              
    //create query
    $query = 'UPDATE '. $this->sectiontemplate_table . " SET 
    
    sectiontemplate  = :sectiontemplate,
    description      = :description
    WHERE id         =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->sectiontemplate     = htmlspecialchars(strip_tags($this->sectiontemplate));
    $this->description         = htmlspecialchars(strip_tags($this->description));
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':sectiontemplate', $this->sectiontemplate);
   $stmt->bindParam(':description', $this->description);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete sectiontemplate ***/
public function delete_sectiontemplate(){
              
//create query
$query = 'DELETE FROM '. $this->sectiontemplate_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}

/******** **** **** **** **** ************ **** **** **** **** ****   slider  ******** **** **** **** **** ******** **** **** **** **** ********/
/****   slider  ****/
public function slider(){
    //clean data
    $this->image     = htmlspecialchars(strip_tags($this->image));
    $this->title     = htmlspecialchars(strip_tags($this->title));
    $this->content   = htmlspecialchars(strip_tags($this->content));
    $this->link      = htmlspecialchars(strip_tags($this->link));
    $this->position  = htmlspecialchars(strip_tags($this->position));
    $this->status    = htmlspecialchars(strip_tags($this->status));
    $this->template  = htmlspecialchars(strip_tags($this->template));
    
    //create query
    $query = 'INSERT INTO '.$this->slider_table.' SET
    image       = :image,
    title       = :title,
    content     = :content,
    link        = :link,
    position    = :position,
    status      = :status,
    template    = :template';
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':image', $this->image);
    $stmt->bindParam(':title', $this->title);
    $stmt->bindParam(':content', $this->content);
    $stmt->bindParam(':link', $this->link);
    $stmt->bindParam(':position', $this->position);
    $stmt->bindParam(':status', $this->status);
    $stmt->bindParam(':template', $this->template);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}



/*** read slider ***/
public function read_slider(){
    //create query
    $query = 'SELECT
    s.id,
    s.image,
    s.title,
    s.content,
    s.link,
    s.position,
    s.status,
    s.template,
    s.created
   
    FROM '.$this->slider_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all slider ***/
public function read_allslider(){
    //create query
    $query = 'SELECT
    s.id,
    s.image,
    s.title,
    s.content,
    s.link,
    s.position,
    s.status,
    s.template
    
   
    FROM '.$this->slider_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single slider ***/
 public function read_singleslider(){
    $query= 'SELECT
    id,
    image,
    title,
    content,
    link,
    position,
    status,
    template
     
    FROM '.$this->slider_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id       = $row['id'];
    $this->image    = $row['image'];
    $this->title    = $row['title'];
    $this->content  = $row['content'];
    $this->link     = $row['link'];
    $this->position = $row['position'];
    $this->status   = $row['status'];
    $this->template = $row['template'];

   
    }

/*** update slider ***/
public function update_slider(){
              
    //create query
    $query = 'UPDATE '. $this->slider_table . " SET 
    
    
    title       = :title,
    content     = :content,
    link        = :link,
    position    = :position,
    status      = :status,
    template    = :template
    WHERE id    =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    //$this->image    = htmlspecialchars(strip_tags($this->image));
    $this->title    = htmlspecialchars(strip_tags($this->title));
    $this->content  = htmlspecialchars(strip_tags($this->content));
    $this->link     = htmlspecialchars(strip_tags($this->link));
    $this->position = htmlspecialchars(strip_tags($this->position));
    $this->status   = htmlspecialchars(strip_tags($this->status));
    $this->template = htmlspecialchars(strip_tags($this->template));
    $this->id       = htmlspecialchars(strip_tags($this->id));


   //binding param
   
   //$stmt->bindParam(':image', $this->image);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':content', $this->content);
   $stmt->bindParam(':link', $this->link);
   $stmt->bindParam(':position', $this->position);
   $stmt->bindParam(':status', $this->status);
   $stmt->bindParam(':template', $this->template);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** update slider image ***/
public function update_sliderimage(){
              
    //create query
    $query = 'UPDATE '. $this->slider_table . " SET 
    
    
    image               =  :image
    
    WHERE id        =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    
    $this->image               = htmlspecialchars(strip_tags($this->image));
    
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':image', $this->image);
   
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete slider ***/
public function delete_slider(){
              
//create query
$query = 'DELETE FROM '. $this->slider_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}

/******** **** **** **** **** ************ **** **** **** **** ****   slidertemplate  ******** **** **** **** **** ******** **** **** **** **** ********/
/****   slidertemplate  ****/
public function slidertemplate(){
    //clean data
    $this->slidertemplate   = htmlspecialchars(strip_tags($this->slidertemplate));
    $this->description       = htmlspecialchars(strip_tags($this->description));
   
    
    //create query
    $query = 'INSERT INTO '.$this->slidertemplate_table.' SET
    slidertemplate   = :slidertemplate,
    description      = :description';
   
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(':slidertemplate', $this->slidertemplate);
    $stmt->bindParam(':description', $this->description);
   
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** read slidertemplate ***/
public function read_slidertemplate(){
    //create query
    $query = 'SELECT
    s.id,
    s.slidertemplate,
    s.description
   
    FROM '.$this->slidertemplate_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all slidertemplate ***/
public function read_allslidertemplate(){
    //create query
    $query = 'SELECT
    s.id,
    s.slidertemplate,
    s.description
   
    FROM '.$this->slidertemplate_table.' s
    ORDER BY s.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single slidertemplate ***/
 public function read_singleslidertemplate(){
    $query= 'SELECT
    id,
    slidertemplate,
    description
     
    FROM '.$this->slidertemplate_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id               = $row['id'];
    $this->slidertemplate  = $row['slidertemplate'];
    $this->description      = $row['description'];

   
    }

/*** update slidertemplate ***/
public function update_slidertemplate(){
              
    //create query
    $query = 'UPDATE '. $this->slidertemplate_table . " SET 
    
    slidertemplate  = :slidertemplate,
    description      = :description
    WHERE id         = :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->slidertemplate     = htmlspecialchars(strip_tags($this->slidertemplate));
    $this->description         = htmlspecialchars(strip_tags($this->description));
    $this->id                  = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':slidertemplate', $this->slidertemplate);
   $stmt->bindParam(':description', $this->description);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete slidertemplate ***/
public function delete_slidertemplate(){
              
//create query
$query = 'DELETE FROM '. $this->slidertemplate_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}

/******** **** **** **** **** ************ **** **** **** **** ****   video  ******** **** **** **** **** ******** **** **** **** **** ********/
/****   video  ****/
public function video(){
    //clean data
    $this->video   = htmlspecialchars(strip_tags($this->video));
    $this->title   = htmlspecialchars(strip_tags($this->title));

    
    //create query
    $query = 'INSERT INTO '.$this->video_table.' SET
    video  = :video,
    title  = :title';
   
        //prepare statement
        $stmt = $this->conn->prepare($query);
        //binding param
        $stmt->bindParam(':video', $this->video);
        $stmt->bindParam(':title', $this->title);
   
        //execute
        if ($stmt->execute()) {
            return true;
        }
        //error
        printf("Error %s. \n", $stmt->error);
        return false;
    
}

/*** read video ***/
public function read_video(){
    //create query
    $query = 'SELECT
    v.id,
    v.video,
    v.title,
    v.created
    
    FROM '.$this->video_table.' v
    ORDER BY v.id DESC';
    //$this->conn->quote($this->video_table);
//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read all video ***/
public function read_allvideo(){
    //create query
    $query = 'SELECT
    v.id,
    v.video,
    v.title
   
    FROM '.$this->video_table.' v
    ORDER BY v.id DESC';
    //$this->conn->quote($this->video_table);
//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

 /*** read single video ***/
 public function read_singlevideo(){
    $query= 'SELECT
    id,
    video,
    title
     
    FROM '.$this->video_table.' 
    WHERE id = ? LIMIT 1';
    
    //$this->conn->quote($this->video_table);
    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id         = $row['id'];
    $this->video      = $row['video'];
    $this->title      = $row['title'];

   
    }

/*** update video ***/
public function update_video(){
              
    //create query
    $query = 'UPDATE '. $this->video_table . " SET 
    
    video       = :video,
    title       = :title
    WHERE id    =  :id";
    //prepare statement
    $stmt = $this->conn->prepare($query);

    //clean data
    
    $this->video  = htmlspecialchars(strip_tags($this->video));
    $this->title  = htmlspecialchars(strip_tags($this->title));
    $this->id     = htmlspecialchars(strip_tags($this->id));

   //binding param
   
   $stmt->bindParam(':video', $this->video);
   $stmt->bindParam(':title', $this->title);
   $stmt->bindParam(':id', $this->id);
    //execute
    if($stmt->execute()){
       return true; 
   }
   //error
   printf("Error %s. \n", $stmt->error);
   return false;
}

/*** delete video ***/
public function delete_video(){
              
//create query
$query = 'DELETE FROM '. $this->video_table . " WHERE id = :id";
//prepare statement
$stmt = $this->conn->prepare($query);

//clean data
$this->id      = htmlspecialchars(strip_tags($this->id));

//binding param
$stmt->bindParam(':id', $this->id);
//execute
if($stmt->execute()){
   return true; 
}
//error
printf("Error %s. \n", $stmt->error);
return false;
}

/******** **** **** **** **** ************ **** **** **** **** ****   users  ******** **** **** **** **** ******** **** **** **** **** ********/
/*** read users ***/
public function read_login(){
    //create query
    $query = 'SELECT
    l.id,          
    l.created,
    l.first_name,
    l.last_name,
    l.email,
    l.username,
    l.category,
    l.history   
   
    FROM '.$this->userlogin_table.' l
    ORDER BY l.id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);
//execute query
$stmt->execute();
return $stmt; 
}

/*** read single user ***/
public function read_singlelogin(){
    $query= 'SELECT
    id,          
    created,
    first_name,
    last_name,
    email,
    username,
    category,
    history   
     
    FROM '.$this->userlogin_table.' 
    WHERE id = ? LIMIT 1';
    

    //prepare statement
    $stmt = $this->conn->prepare($query);
    //binding param
    $stmt->bindParam(1, $this->id);
    //execute
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->id           = $row['id'];
    $this->created      = $row['created'];
    $this->first_name   = $row['first_name'];
    $this->last_name    = $row['last_name'];
    $this->email        = $row['email'];
    $this->username     = $row['username'];
    $this->category     = $row['category'];
    $this->history      = $row['history'];

   
    }

}